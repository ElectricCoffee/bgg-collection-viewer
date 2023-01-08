import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
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

function App() {
  const { games, setGames, itemData, setItemData } = useGameStore();
  const playerCount = usePlayerCountStore((st) => st.count);
  const [sentry, setSentry] = useState(0);
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
      getCollection().catch((x) => console.error(x));
    }
    return () => clearInterval(timeout.current);
  }, [games.length, sentry, getCollection]);

  useEffect(() => {
    if (games.length !== 0 && Object.keys(itemData).length === 0) {
      console.log("polling server for game info...");
      getItemData().catch((e) => console.error(e));
    }
  }, [games, getItemData, itemData]);

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
    </div>
  );
}

export default App;
