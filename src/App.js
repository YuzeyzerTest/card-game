import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  {
    src: "/img/helmet-1.png",
    isMatched: false,
  },
  {
    src: "/img/potion-1.png",
    isMatched: false,
  },
  {
    src: "/img/ring-1.png",
    isMatched: false,
  },
  {
    src: "/img/scroll-1.png",
    isMatched: false,
  },
  {
    src: "/img/shield-1.png",
    isMatched: false,
  },
  {
    src: "/img/sword-1.png",
    isMatched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]); // Все карточки
  const [turns, setTurns] = useState(0); // Количество ходов
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled] = useState(false)

  const handleChoice = (card) => {
    if (choiceOne) return setChoiceTwo(card);
    setChoiceOne(card);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setDisabled(false)
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false)
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setMatchedCards = () => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (choiceOne.src === card.src) {
          return { ...card, isMatched: true };
        }
        return card;
      });
    });
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      // Проверяем были ли выбраны обе карточки
      if (choiceOne.src === choiceTwo.src) {
        setMatchedCards();// Проверяем являются ли обе карточки идентичными
        resetTurn(); // сбрасываем наш выбор чтобы начать заново
      } else {
        setTimeout(resetTurn,1000)
      }
     
    }

  }, [choiceOne, choiceTwo, resetTurn,setMatchedCards]);

  return (
    <div className="App">
      <h1>Новая Супер Игра</h1>
      <p>{turns}</p>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.length > 0 &&
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              isMatched={card === choiceOne || card === choiceTwo || card.isMatched}
              isDisabled={disabled}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
