"use client";

import { useState } from "react";
import styled from "styled-components";

import { shuffleArrayHelper } from "common/helpers";
import { CARDS } from "common/constants";
import { CardInterface } from "common/types";
import { Card } from "components/Card";

export const Game = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [openCardId, setOpenCardId] = useState<number>();

  const cardClick = (cardId: number) => {
    setOpenCardId(cardId);
  };

  const startGame = () => {
    setOpenCardId(undefined);
    setCards([...shuffleArrayHelper(CARDS)]);
  };

  return (
    <>
      <button onClick={() => startGame()}>Start game</button>
      <CardsContainer>
        {cards.map(({ id, name }) => (
          <Card
            key={id}
            name={name}
            handleCardClick={() => cardClick(id)}
            isOpen={id === openCardId}
          />
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
