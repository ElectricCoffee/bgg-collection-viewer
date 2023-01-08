import create from "zustand";
import { persist } from "zustand/middleware";
import { ItemType } from "../constants";
import GameData from "../types/GameData";
import ItemData, { Item } from "../types/ItemData";

interface GameStore {
  games: GameData[];
  itemData: ItemData;
  setGames: (games: GameData[]) => void;
  setItemData: (itemData: ItemData) => void;
  getItem: (gameData: GameData) => Item;
  isExpansion: (game: GameData) => boolean;
  reset: () => void;
}

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      games: [],
      itemData: {},
      setGames: (games) => set({ games }),
      setItemData: (itemData) => set({ itemData }),
      getItem: (game) => get().itemData[game.id],
      isExpansion: (game) =>
        get().itemData[game.id]?.type === ItemType.Expansion,
      reset: () => set({ games: [], itemData: {} }),
    }),
    {
      name: "game-store",
    }
  )
);

export default useGameStore;
