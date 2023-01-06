export interface Item {
  description: string;
  minPlayers: string;
  maxPlayers: string;
}

export default interface ItemData {
  [id: string]: Item;
}
