"use client";

import { useState } from "react";
import styled from "styled-components";

import { shuffleArrayHelper } from "common/helpers";
import { CARDS } from "common/constants";
import { CardInterface } from "common/types";
import { Card } from "components/Card";

export const Game = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);

  return (
    <>
      <button onClick={() => setCards([...shuffleArrayHelper(CARDS)])}>
        Start game
      </button>
      <CardsContainer>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardsContainer>
    </>
  );
};

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: repeat(3, 200px);
  gap: 10px;
`;
