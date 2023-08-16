interface CardProps {
  isOpen: boolean;
  name: string;
  handleClick: () => void;
}

export const Card = ({ isOpen, name, handleClick }: CardProps) => {
  return (
    <div
      className={`card-container ${isOpen ? "no-pointer-events" : ""}`}
      onClick={handleClick}
    >
      <div className={`card-wrapper ${isOpen ? "card-open" : ""}`}>
        <div className="card" />
        <div
          className="card card-back"
          style={{ backgroundImage: `url("./img/${name}")` }}
        />
      </div>
    </div>
  );
};
