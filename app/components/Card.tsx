"use client";

import styled from "styled-components";

import { CardInterface } from "../common/types";

interface CardProps {
  card: CardInterface;
}

export const Card = ({ card }: CardProps) => (
  <StyledCard>{card.name}</StyledCard>
);

const StyledCard = styled.div`
  background-color: rebeccapurple;
  border: 1px solid white;
  border-radius: 5px;
`;
