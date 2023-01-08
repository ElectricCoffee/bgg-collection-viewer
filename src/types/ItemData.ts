export interface Item {
  description: string;
  minPlayers: number;
  maxPlayers: number;
  type: string;
  categories: string[];
  mechanisms: string[];
  designers: string[];
}

interface ItemData {
  [id: string]: Item;
}

namespace ItemData {
  export const isExpansion = (id: string, data: ItemData) =>
    data[id]?.type === "boardgameexpansion";
}

export default ItemData;
