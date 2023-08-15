import styled from "styled-components";

interface CardProps {
  isOpen: boolean;
  name: string;
  handleClick: () => void;
}

export const Card = ({ isOpen, name, handleClick }: CardProps) => {
  return (
    <CardWrapper onClick={handleClick} $isOpen={isOpen}>
      <StyledCard $isOpen={isOpen}>
        <FrontCard />
        <BackCard $name={name} />
      </StyledCard>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ $isOpen: boolean }>`
  cursor: pointer;
  pointer-events: ${({ $isOpen }) => $isOpen && "none"};
`;

const StyledCard = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => $isOpen && "rotateY(180deg)"};
  transform-style: preserve-3d;
  transition: all 0.4s ease;
  border: 2px solid;
  border-color: ${({ $isOpen }) => ($isOpen ? "gray" : "white")};
  border-radius: 5px;
  width: 100%;
  height: 100%;

  &:hover {
    border-color: #956596;
  }
`;

const FrontCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-image: url("./img/cover.png");
`;

const BackCard = styled(FrontCard)<{ $name: string }>`
  background-image: ${({ $name }) => `url("./img/${$name}")`};
  transform: rotateY(180deg);
`;
