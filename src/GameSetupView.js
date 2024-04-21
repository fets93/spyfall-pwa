import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSetupView.css'; 
import { FaTrash } from 'react-icons/fa';


function GameSetupView() {
  const [playerNames, setPlayerNames] = useState(JSON.parse(localStorage.getItem('PlayerNames')) || []);
  const [numberOfSpies, setNumberOfSpies] = useState(parseInt(localStorage.getItem('NumberOfSpies'), 10) || 1);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [places] = useState(JSON.parse(localStorage.getItem('SavedPlaces')) || ['Default Place']);
  const navigate = useNavigate();

  useEffect(() => {
    // ComponentDidMount equivalent
    loadSettings();
  }, []);

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    if (trimmedName) {
      const updatedPlayers = [...playerNames, trimmedName];
      setPlayerNames(updatedPlayers);
      localStorage.setItem('PlayerNames', JSON.stringify(updatedPlayers));
      setNewPlayerName('');
    }
  };

  const startGame = () => {
    navigate('/game-view', { state: { playerNames, numberOfSpies, places } });
};

  const deletePlayer = (player) => {
    const updatedPlayers = playerNames.filter(p => p !== player);
    setPlayerNames(updatedPlayers);
    localStorage.setItem('PlayerNames', JSON.stringify(updatedPlayers));
  };

  const loadSettings = () => {
    const storedPlayers = JSON.parse(localStorage.getItem('PlayerNames')) || [];
    const spiesCount = parseInt(localStorage.getItem('NumberOfSpies'), 10) || 1;
    setPlayerNames(storedPlayers);
    setNumberOfSpies(spiesCount);
  };

  return (
    <div className="App">
      <h1>Game Setup</h1>
      <div className="card">
        <h2>Player Names</h2>
        <div className="input-group">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter new player name"
          />
          <button onClick={addPlayer} disabled={!newPlayerName.trim()}>Add</button>
        </div>
        {playerNames.map((player, index) => (
          <div className="player-item" key={index}>
            {player}
            <button onClick={() => deletePlayer(player)} className="delete-button">
            <FaTrash />
</button>
          </div>
        ))}
      </div>
  
      <div className="card">
        <h2>Number of Spies</h2>
        <select
          value={numberOfSpies}
          onChange={(e) => setNumberOfSpies(parseInt(e.target.value, 10))}
          className="action-button" // This adds some styling to the dropdown
        >
          {Array.from({ length: playerNames.length }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
  
      <div className="card">
        <button className="action-button" onClick={() => navigate('/manage-places')}>Manage Places</button>
      </div>
  
      <div className="card">
        <button className="action-button start-game-button" onClick={startGame}>Start Game</button>
      </div>
    </div>
  );  
}

export default GameSetupView;
