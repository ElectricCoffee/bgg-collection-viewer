import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import useGameStore from "./stores/useGameStore";
import _ from "lodash";
import Collection from "./utils/Collection";
import Items from "./utils/Items";
import usePlayerCountStore from "./stores/usePlayerCountStore";
import GameCard from "./components/GameCard";
import NavBar from "./components/NavBar";

const userName = "ElectricCoffee";

const baseUrl = "https://boardgamegeek.com/xmlapi2/";

const bggMystery = "&amp;#226;&amp;#128;&amp;#139;";
const bggNewLine = "&amp;#10;";

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

      {games
        .filter(
          ({ id }) =>
            playerCount === 0 ||
            (itemData[id]?.minPlayers <= playerCount &&
              playerCount <= itemData[id]?.maxPlayers)
        )
        //.filter(({ id }) => itemData[id]?.type === "boardgameexpansion")
        .map((game) => (
          <GameCard game={game} key={game.id + game.name} />
        ))}
    </div>
  );
}

export default App;
