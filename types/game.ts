export type Card = {
  value: number;
  symbol: string;
};

export type Player = {
  id: number;
  name: string;
  hand: Card[];
};

export type GameState = {
  players: Player[];
  deck: Card[];
  currentPlayerIndex: number;
};
