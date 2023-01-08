import React, { useEffect, useRef, useState } from "react";
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

const userName = "ElectricCoffee";

const baseUrl = "https://boardgamegeek.com/xmlapi2/";

function App() {
  const { games, setGames, itemData, setItemData } = useGameStore();
  const playerCount = usePlayerCountStore((st) => st.count);
  const [sentry, setSentry] = useState(0);
  const timeout = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (games.length === 0) {
      console.log("polling server for game data...");
      axios
        .get(baseUrl + `collection?username=${userName}&own=1`)
        .then((res) => {
          const xml = new DOMParser().parseFromString(res.data, "text/xml");

          if (isRequestPending(xml)) {
            timeout.current = setTimeout(() => setSentry((x) => x + 1), 5000);
            return;
          }

          const newGames = Collection.dealWithXml(xml);
          setGames(newGames);
        })
        .catch((x) => console.error(x));

      return () => clearInterval(timeout.current);
    }
  }, [games.length, setGames, sentry]);

  useEffect(() => {
    if (games.length !== 0 && Object.keys(itemData).length === 0) {
      console.log("polling server for game info...");
      const ids = _.uniq(games.map((x) => x.id)).join(",");

      axios
        .get(baseUrl + `thing?id=${ids}`)
        .then((res) => {
          const xml = new DOMParser().parseFromString(res.data, "text/xml");
          console.log(xml);
          const data = Items.dealWithXml(xml);
          setItemData(data);
        })
        .catch((e) => console.error(e));
    }
  }, [games, itemData, setItemData]);

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
          //.filter(({ id }) => itemData[id]?.type === "boardgameexpansion")
          .map((game) => (
            <>
              <br />
              <GameCard game={game} key={game.id + game.name + game.year} />
            </>
          ))}
      </Container>
    </div>
  );
}

export default App;
