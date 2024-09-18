import { Card } from "@/types/game";

const suits = ["♠", "♥", "♦", "♣"];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, symbol: suit });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(deck: Card[], numPlayers: number): Card[][] {
  const hands: Card[][] = Array(numPlayers)
    .fill(null)
    .map(() => []);

  let currentPlayer = 0;

  while (deck.length > 0) {
    const card = deck.pop()!;
    hands[currentPlayer].push(card);

    currentPlayer = (currentPlayer + 1) % numPlayers;
  }

  return hands;
}
