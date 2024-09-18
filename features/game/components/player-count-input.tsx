"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type PlayerCountInputProps = {
  min: number;
  max: number;
  defaultValue: number;
};

export default function PlayerCountInput({
  min,
  max,
  defaultValue,
}: PlayerCountInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [gameStarted, setGameStarted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  const decrement = () => {
    setValue((prev) => Math.max(prev - 1, min));
  };

  const increment = () => {
    setValue((prev) => Math.min(prev + 1, max));
  };

  const startGame = () => {
    setGameStarted(true);
    // Here you would typically initiate your game logic
    console.log(`Starting game with ${value} players`);
  };

  return (
    <div className="w-full max-w-sm">
      <Label
        htmlFor="player-count"
        className="block text-sm font-medium text-gray-700 mb-2 text-center"
      >
        How many players?
      </Label>
      <div className="flex items-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          id="player-count"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="w-full">
        <Link href="/games/1">Start Game</Link>
      </Button>
    </div>
  );
}
