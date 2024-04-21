import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GameView.css'; // Ensure your CSS styles are correctly set up

function GameView() {
  const [cards, setCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [discussionStarted, setDiscussionStarted] = useState(false);
  const [showSpies, setShowSpies] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { playerNames, numberOfSpies, places } = location.state || { playerNames: [], numberOfSpies: 0, places: [] };

  useEffect(() => {
    setCards(setupGame());
  }, [playerNames, numberOfSpies, places]);

  const setupGame = () => {
    let gameCards = [];
    const place = places[Math.floor(Math.random() * places.length)];
    gameCards = Array(playerNames.length).fill(place);

    const spyIndices = new Set();
    while (spyIndices.size < numberOfSpies) {
      spyIndices.add(Math.floor(Math.random() * playerNames.length));
    }

    spyIndices.forEach(index => {
      gameCards[index] = 'Spy';
    });

    return gameCards;
  };

  const handleCardTap = () => {
    if (cardRevealed) {
      if (currentPlayer === playerNames.length - 1) {
        setDiscussionStarted(true); // Move to discussion
        setCardRevealed(false); // No longer show the card
      } else {
        setCurrentPlayer(currentPlayer + 1); // Move to the next player
        setCardRevealed(false); // Hide the card for the next player
      }
    } else {
      setCardRevealed(true); // Reveal the card for the current player
    }
  };

  const revealSpies = () => {
    setShowSpies(true);
  };

  const endRound = () => {
    navigate('/'); // Navigate back to the setup view
  };

  if (!playerNames || playerNames.length === 0) {
    return <div>Loading game data...</div>; // Handle the case where data is not available
  }

  return (
    <div className="game-container">
      <h1>Game Cards</h1>
      {!discussionStarted && (
        <div className="game-card" onClick={handleCardTap}>
          <h2 className="game-item">{playerNames[currentPlayer]}: {cardRevealed ? cards[currentPlayer] : "Tap to reveal your card"}</h2>
        </div>
      )}
      {!cardRevealed && discussionStarted && (
        <button className="action-button reveal-button" onClick={revealSpies}>Reveal Spies</button>
      )}
      {showSpies && (
        <>
          <div>
            {cards.map((card, index) => card === "Spy" && <p key={index}>{playerNames[index]} is a Spy</p>)}
          </div>
          <button className="action-button" onClick={endRound}>End Round</button>
        </>
      )}
    </div>
  );
}

export default GameView;
