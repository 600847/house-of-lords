"use client";
import Card from "@/features/game/components/Card";
import { useGameSetup } from "@/hooks/useGameSetup";

export default function Game({ params }: { params: { id: string } }) {
  const { gameState, setGameState, playerCount, setPlayerCount } =
    useGameSetup(2);

  const handCardStyle = (index: number, totalCards: number) => {
    const totalAngle = 60;
    const anglePerCard = totalCards > 1 ? totalAngle / (totalCards - 1) : 0;
    const startAngle = -totalAngle / 2;
    const rotationAngle = startAngle + index * anglePerCard;

    const radius = 150;
    const offsetY = radius - Math.cos((rotationAngle * Math.PI) / 180) * radius;
    const offsetX = Math.sin((rotationAngle * Math.PI) / 180) * radius;

    return {
      transform: `rotate(${rotationAngle}deg) translate(${offsetX}px, ${-offsetY}px)`,
      position: "absolute" as const,
      transformOrigin: "bottom center",
    };
  };

  const getPlayerPositions = () => {
    switch (playerCount) {
      case 2:
        return [
          "bottom-[5%] left-1/2 -translate-x-1/2",
          "top-[5%] left-1/2 -translate-x-1/2",
        ];
      case 3:
        return [
          "bottom-[5%] left-1/2 -translate-x-1/2",
          "top-[5%] left-1/4 -translate-x-1/2",
          "top-[5%] right-1/4 translate-x-1/2",
        ];
      case 4:
        return [
          "bottom-[5%] left-1/2 -translate-x-1/2",
          "top-[5%] left-1/2 -translate-x-1/2",
          "top-1/2 left-[5%] -translate-y-1/2",
          "top-1/2 right-[5%] translate-y-1/2",
        ];
      case 5:
        return [
          "bottom-[5%] left-1/2 -translate-x-1/2",
          "top-[5%] left-1/4 -translate-x-1/2",
          "top-[5%] right-1/4 translate-x-1/2",
          "top-1/2 left-[5%] -translate-y-1/2",
          "top-1/2 right-[5%] -translate-y-1/2",
        ];
      default:
        return [];
    }
  };

  const playerPositions = getPlayerPositions();

  return (
    <div className="h-screen w-screen relative bg-green-800 flex flex-col">
      {/* Game board */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-700 rounded-lg flex items-center justify-center">
        <Card value={1} symbol="|" />
      </div>

      {/* Players */}
      {gameState.players.map((player, playerIndex) => (
        <div
          key={player.id}
          className={`absolute ${getPlayerPositions()[playerIndex]} ${
            playerIndex === 0 ? "bg-blue-500" : "bg-red-500"
          } text-white p-2 rounded-full`}
        >
          <div
            className={`${
              playerIndex === 0 ? "bg-blue-500" : "bg-red-500"
            } text-white p-2 rounded-full text-center`}
          >
            {player.name}
          </div>
          {/* Cards around the player */}
          <div className="relative w-full h-full">
            {player.hand.map((card, cardIndex) => (
              <div
                key={cardIndex}
                style={handCardStyle(cardIndex, player.hand.length)}
                className="absolute -top-52 -left-4"
              >
                <Card value={card.value} symbol={card.symbol} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
