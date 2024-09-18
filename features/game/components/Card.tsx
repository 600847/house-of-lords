"use client";

import React, { useState } from "react";

type CardProps = {
  value: number;
  symbol: string;
};

export default function Card({ value, symbol }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`card ${flipped ? "card-flipped" : ""}`}>
        <div className="card-back card-face"></div>
        <div className="card-front card-face">
          <p className="text-black"> {value}</p>
        </div>
      </div>
    </div>
  );
}
