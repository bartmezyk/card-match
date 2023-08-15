"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

import { randomizeArrayHelper } from "common/helpers";
import { CARDS } from "common/constants";
import { CardInterface } from "common/types";
import { GameTimer } from "components/GameTimer";
import { Card } from "./Card";

export const Game = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<CardInterface>();
  const [secondSelectedCard, setSecondSelectedCard] = useState<CardInterface>();
  const [openCardIds, setOpenCardIds] = useState<number[]>([]);
  const [cardsOpenTimer, setCardsOpenTimer] = useState<NodeJS.Timeout>();
  const [startGameDate, setStartGameDate] = useState<Date>();
  const [turns, setTurns] = useState(0);

  const startGame = () => {
    clearSelectedCards();
    setOpenCardIds([]);
    clearTimeout(cardsOpenTimer);
    setStartGameDate(undefined);
    setTurns(0);
    setCards([...randomizeArrayHelper(CARDS)]);
  };

  const handleCardClick = (card: CardInterface) => {
    if (!startGameDate) {
      setStartGameDate(new Date());
    }

    if (secondSelectedCard || !firstSelectedCard) {
      setFirstSelectedCard(card);
      setSecondSelectedCard(undefined);
      clearTimeout(cardsOpenTimer);
      return;
    }

    setSecondSelectedCard(card);
  };

  const checkMatch = () => {
    if (firstSelectedCard && secondSelectedCard) {
      setTurns((prev) => prev + 1);

      if (firstSelectedCard.name === secondSelectedCard.name) {
        clearSelectedCards();
        setOpenCardIds((prev) => [
          ...prev,
          firstSelectedCard.id,
          secondSelectedCard.id,
        ]);

        return;
      }

      setCardsOpenTimer(
        setTimeout(() => {
          clearSelectedCards();
        }, 1000)
      );
    }
  };

  const clearSelectedCards = () => {
    setFirstSelectedCard(undefined);
    setSecondSelectedCard(undefined);
  };

  useEffect(() => {
    checkMatch();
    // eslint-disable-next-line
  }, [secondSelectedCard]);

  useEffect(() => {
    setCards([...randomizeArrayHelper(CARDS)]);

    return () => {
      clearTimeout(cardsOpenTimer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <GameContainer>
      <Header>card match</Header>
      <Button onClick={() => startGame()}>new game</Button>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            handleClick={() => handleCardClick(card)}
            isOpen={
              card.id === firstSelectedCard?.id ||
              card.id === secondSelectedCard?.id ||
              openCardIds.some((id) => id === card.id)
            }
            name={card.name}
          />
        ))}
      </CardsContainer>
      <h4>Turns: {turns}</h4>
      {startGameDate && (
        <GameTimer
          startGameDate={startGameDate}
          stopCounting={openCardIds.length === 12}
        />
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
`;

const Header = styled.h1`
  font-size: 36px;
  text-transform: capitalize;
  text-align: center;
`;

const Button = styled.button`
  width: 140px;
  height: 35px;
  background-color: transparent;
  color: white;
  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 4px;
  margin: 25px 0;

  &:hover {
    background-color: #50255c;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  place-content: center;
  width: 830px;
  max-width: calc(100vw - 80px);
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-rows: 200px;
  gap: 10px;
  margin-bottom: 15px;
`;
