import create from "zustand";

interface PlayerCount {
  count: number;
  setCount: (num: number) => void;
  reset: () => void;
}

const usePlayerCountStore = create<PlayerCount>()((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  reset: () => set({ count: 0 }),
}));

export default usePlayerCountStore;
