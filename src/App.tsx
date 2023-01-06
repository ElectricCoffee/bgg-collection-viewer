import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import useGameStore from "./stores/useGameStore";
import _ from "lodash";
import Collection from "./utils/Collection";
import Items from "./utils/Items";
import usePlayerCountStore from "./stores/usePlayerCountStore";
import ItemData from "./types/ItemData";

const userName = "ElectricCoffee";

const baseUrl = "https://boardgamegeek.com/xmlapi2/";

function ResetButton() {
  const reset = useGameStore((st) => st.reset);

  return <button onClick={reset}>Reload List</button>;
}

const PlayerCountButtons = () => {
  const { count, setCount } = usePlayerCountStore();

  const decorate = (num: number) => {
    const text = num === 0 ? "All" : num;
    return num === count ? `» ${text} «` : text;
  };

  return (
    <div>
      Number of players:{" "}
      {_.range(21).map((i) => (
        <button onClick={() => setCount(i)} key={i}>
          {decorate(i)}
        </button>
      ))}
    </div>
  );
};

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
      <ResetButton />
      <PlayerCountButtons />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Year</th>
            <th>Min Players</th>
            <th>Max Players</th>
          </tr>
        </thead>
        <tbody>
          {games
            .filter(
              ({ id }) =>
                playerCount === 0 ||
                (itemData[id]?.minPlayers <= playerCount &&
                  playerCount <= itemData[id]?.maxPlayers)
            )
            //.filter(({ id }) => itemData[id]?.type === "boardgameexpansion")
            .map((game) => (
              <tr key={game.id + game.name}>
                <td>{game.id}</td>
                <td>
                  <img src={game.thumb} alt="thumbnail" />
                </td>
                <td>
                  <strong>{game.name.replace("&amp;", "&")}</strong>
                  {ItemData.isExpansion(game.id, itemData) && " (exp.)"}
                </td>
                <td>{game.year}</td>
                <td>{itemData[game.id]?.minPlayers}</td>
                <td>{itemData[game.id]?.maxPlayers}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
