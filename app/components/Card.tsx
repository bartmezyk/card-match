"use client";

import styled from "styled-components";

interface CardProps {
  name: string;
  isOpen: boolean;
  handleCardClick: () => void;
}

export const Card = ({ name, isOpen, handleCardClick }: CardProps) => (
  <StyledCard $isOpen={isOpen} name={name} onClick={handleCardClick} />
);

const StyledCard = styled.div<{ $isOpen: boolean; name: string }>`
  background-image: ${({ $isOpen, name }) =>
    $isOpen ? `url("./img/${name}.png")` : `url("./img/cover.png")`};
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
`;
