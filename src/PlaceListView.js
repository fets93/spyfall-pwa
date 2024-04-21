import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './PlaceListView.css';

function PlaceListView() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState(JSON.parse(localStorage.getItem('SavedPlaces')) || ["Beach", "Restaurant", "Space Station"]);
  const [newPlace, setNewPlace] = useState('');

  useEffect(() => {
    // This will fetch the places from localStorage when the component mounts
    const savedPlaces = JSON.parse(localStorage.getItem('SavedPlaces')) || ["Default Place"];
    setPlaces(savedPlaces);
  }, []);

  const addPlace = () => {
    const trimmedName = newPlace.trim();
    if (trimmedName) {
      const updatedPlaces = [...places, trimmedName];
      setPlaces(updatedPlaces);
      setNewPlace('');
      savePlaces(updatedPlaces);
    }
  };

  const deletePlace = (place) => {
    const updatedPlaces = places.filter(p => p !== place);
    setPlaces(updatedPlaces);
    savePlaces(updatedPlaces);
  };

  const savePlaces = (updatedPlaces) => {
    localStorage.setItem('SavedPlaces', JSON.stringify(updatedPlaces || places));
  };

  return (
    <div className="place-list-container">
      <h1>Places</h1>
      <div className="place-card">
        {places.map((place, index) => (
          <div className="place-item" key={index}>
            <span>{place}</span>
            <button onClick={() => deletePlace(place)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="place-input-group">
        <input
          className="place-input"
          type="text"
          value={newPlace}
          onChange={e => setNewPlace(e.target.value)}
          placeholder="Add new place"
        />
        <button onClick={addPlace} disabled={!newPlace.trim()} className="action-button">
          Add
        </button>
      </div>
      <button onClick={() => { savePlaces(); navigate('/'); }} className="save-button">
        Save
      </button>
    </div>
  );
  
}

export default PlaceListView;
