import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles/App.css";
import axios from "axios";
import useGameStore from "./stores/useGameStore";
import _ from "lodash";
import Collection from "./utils/Collection";
import Items from "./utils/Items";
import usePlayerCountStore from "./stores/usePlayerCountStore";
import GameCard from "./components/GameCard";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { isRequestPending } from "./types/RequestPending";
import { baseUrl, userName } from "./constants";
import LoadingModal from "./components/modals/LoadingModal";
import LoadingErrorModal from "./components/modals/LoadingErrorModal";

function App() {
  const { games, setGames, itemData, setItemData } = useGameStore();
  const playerCount = usePlayerCountStore((st) => st.count);
  const [sentry, setSentry] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const timeout = useRef<NodeJS.Timeout | undefined>();

  const getCollection = useCallback(async () => {
    const res = await axios.get(
      `${baseUrl}collection?username=${userName}&own=1`
    );
    const xml = new DOMParser().parseFromString(res.data, "text/xml");

    if (isRequestPending(xml)) {
      timeout.current = setTimeout(() => setSentry((x) => x + 1), 5000);
      return;
    }

    const newGames = Collection.dealWithXml(xml);
    setGames(newGames);
  }, [setGames]);

  const getItemData = useCallback(async () => {
    const ids = _.uniq(games.map((x) => x.id)).join(",");
    const res = await axios.get(`${baseUrl}thing?id=${ids}`);
    const xml = new DOMParser().parseFromString(res.data, "text/xml");
    const data = Items.dealWithXml(xml);
    setItemData(data);
  }, [games, setItemData]);

  useEffect(() => {
    if (games.length === 0) {
      console.log("polling server for game data...");
      setLoading(true);
      getCollection().catch((err) => {
        setLoading(false);
        setError(err);
        console.error(err);
      });
    }
    return () => clearInterval(timeout.current);
  }, [games.length, sentry, getCollection]);

  useEffect(() => {
    if (loading && games.length !== 0 && !error) {
      console.log("polling server for game info...");
      getItemData()
        .catch((err) => {
          setError(err);
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [error, games.length, getItemData, loading]);

  return (
    <div className="App">
      <NavBar />
      <Container>
        {games
          .filter(
            ({ id }) =>
              playerCount === 0 ||
              (itemData[id]?.minPlayers <= playerCount &&
                playerCount <= itemData[id]?.maxPlayers)
          )
          .map((game) => (
            <React.Fragment key={game.id + game.name + game.year}>
              <br />
              <GameCard game={game} />
            </React.Fragment>
          ))}
      </Container>
      <LoadingModal show={loading} />
      <LoadingErrorModal error={error} onClose={() => setError(undefined)} />
    </div>
  );
}

export default App;
