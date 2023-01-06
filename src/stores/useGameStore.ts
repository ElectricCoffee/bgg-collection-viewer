import create from "zustand";
import { persist } from "zustand/middleware";
import GameData from "../types/GameData";
import ItemData from "../types/ItemData";

interface GameStore {
  games: GameData[];
  itemData: ItemData;
  setGames: (games: GameData[]) => void;
  setItemData: (itemData: ItemData) => void;
  reset: () => void;
}

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      games: [],
      itemData: {},
      setGames: (games) => set({ games }),
      setItemData: (itemData) => set({ itemData }),
      reset: () => set({ games: [], itemData: {} }),
    }),
    {
      name: "game-store",
    }
  )
);

export default useGameStore;
