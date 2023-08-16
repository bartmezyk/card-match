"use client";

import { useEffect, useState } from "react";
import Spinner from "react-spinner-material";

import { prepareCardsHelper } from "common/helpers";
import { CARDS } from "common/constants";
import { GameCardInterface } from "common/types";
import { Timer } from "components/Timer";
import { Card } from "components/Card";

export const Game = () => {
  const [cards, setCards] = useState<GameCardInterface[]>([]);
  const [firstSelectedCard, setFirstSelectedCard] =
    useState<GameCardInterface>();
  const [secondSelectedCard, setSecondSelectedCard] =
    useState<GameCardInterface>();
  const [cardsOpenTimer, setCardsOpenTimer] = useState<NodeJS.Timeout>();
  const [startDate, setStartDate] = useState<Date>();
  const [turns, setTurns] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startGame = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    clearSelectedCards();
    clearTimeout(cardsOpenTimer);
    setStartDate(undefined);
    setTurns(0);
    setCards(prepareCardsHelper(CARDS));
  };

  const handleCardClick = (card: GameCardInterface) => {
    if (!startDate) {
      setStartDate(new Date());
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

      if (firstSelectedCard.pairId === secondSelectedCard.pairId) {
        clearSelectedCards();

        setCards((prev) =>
          prev.map((card) =>
            card.pairId === secondSelectedCard.pairId
              ? { ...card, disabled: true }
              : card
          )
        );

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
    setCards(prepareCardsHelper(CARDS));

    return () => {
      clearTimeout(cardsOpenTimer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center my-5 mx-auto">
      <h1 className="text-4xl font-bold capitalize text-center">card match</h1>
      <button
        className="w-36 h-9 bg-transparent hover:bg-fuchsia-950 text-xl capitalize cursor-pointer border-2 border-solid border-white rounded my-6"
        onClick={() => startGame()}
      >
        new game
      </button>
      {isLoading ? (
        <Spinner
          radius={60}
          color="#FFF"
          stroke={5}
          style={{ marginTop: 70 }}
        />
      ) : (
        <>
          <div className="grid place-content-center w-[830px] max-w-cards grid-cols-cards auto-rows-cards gap-2.5 mb-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                handleClick={() => handleCardClick(card)}
                isOpen={
                  card.id === firstSelectedCard?.id ||
                  card.id === secondSelectedCard?.id ||
                  card.disabled
                }
                name={card.name}
              />
            ))}
          </div>
          {startDate && <h4 className="font-mono">Turns: {turns}</h4>}
        </>
      )}
      {startDate && (
        <Timer
          startDate={startDate}
          stopCounting={!cards.some((card) => !card.disabled)}
        />
      )}
    </div>
  );
};
