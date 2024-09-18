import { useState, useEffect } from "react";
import { Player, GameState, Card } from "@/types/game";
import { createDeck, shuffleDeck, dealCards } from "@/utils/gameLogic";

export function useGameSetup(initialPlayerCount: number = 2) {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    deck: [],
    currentPlayerIndex: 0,
  });

  const [playerCount, setPlayerCount] = useState(initialPlayerCount);

  useEffect(() => {
    const deck = shuffleDeck(createDeck());
    const hands = dealCards(deck, playerCount);
    const players: Player[] = Array(playerCount)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: index === 0 ? "You" : `Player ${index + 1}`,
        hand: hands[index],
      }));

    setGameState({
      players,
      deck,
      currentPlayerIndex: 0,
    });
  }, [playerCount]);

  return {
    gameState,
    setGameState,
    playerCount,
    setPlayerCount,
  };
}
