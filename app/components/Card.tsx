interface CardProps {
  isOpen: boolean;
  name: string;
  handleClick: () => void;
}

export const Card = ({ isOpen, name, handleClick }: CardProps) => (
  <div
    className={`cursor-pointer ${isOpen ? "pointer-events-none" : ""}`}
    onClick={handleClick}
  >
    <div
      className={`preserve-3d transition-all duration-300 border-2 border-solid border-white hover:border-fuchsia-800 rounded w-full h-full card-wrapper ${
        isOpen ? "rotate-y-180 border-zinc-500" : ""
      }`}
    >
      <div className="absolute w-full h-full backface-hidden bg-cardCover" />
      <div
        className="absolute w-full h-full backface-hidden rotate-y-180"
        style={{ backgroundImage: `url("./img/${name}")` }}
      />
    </div>
  </div>
);
