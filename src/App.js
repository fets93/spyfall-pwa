import './App.css';
import GameSetupView from './GameSetupView';
import PlaceListView from './PlaceListView';
import GameView from './GameView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<GameSetupView />} />
          <Route path="/manage-places" element={<PlaceListView />} />
          <Route path="/game-view" element={<GameView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
