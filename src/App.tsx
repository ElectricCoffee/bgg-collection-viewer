import React, { useEffect } from "react";
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

const userName = "ElectricCoffee";

const baseUrl = "https://boardgamegeek.com/xmlapi2/";

function App() {
  const { games, setGames, itemData, setItemData } = useGameStore();
  const playerCount = usePlayerCountStore((st) => st.count);

  useEffect(() => {
    if (games.length === 0) {
      console.log("polling server for game data...");
      axios
        .get(baseUrl + `collection?username=${userName}&own=1`)
        .then((collection) => {
          const newGames = Collection.dealWithXml(collection);
          setGames(newGames);
        })
        .catch((x) => console.error(x));
    }
  }, [games.length, setGames]);

  useEffect(() => {
    if (games.length !== 0 && Object.keys(itemData).length === 0) {
      console.log("polling server for game info...");
      const ids = _.uniq(games.map((x) => x.id)).join(",");

      axios
        .get(baseUrl + `thing?id=${ids}`)
        .then((items) => {
          const data = Items.dealWithXml(items);
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
              <GameCard game={game} key={game.id + game.name} />
            </>
          ))}
      </Container>
    </div>
  );
}

export default App;
