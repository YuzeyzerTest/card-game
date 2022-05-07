import React from "react";
import "./style.css";

const Card = ({ card, handleChoice, isMatched,isDisabled }) => {

  const handleClick = () => {
    if (!isDisabled) handleChoice(card)
  };

  return (
    <div className="card">
      <div className={`${isMatched ? "flipped" : ""}`}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card-back"
        />
      </div>
    </div>
  );
};

export default Card;
