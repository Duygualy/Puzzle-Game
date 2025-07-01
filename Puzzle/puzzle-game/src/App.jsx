import { PuzzleProvider } from './components/PuzzleContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PuzzleGame from './pages/PuzzleGame';
import Beginner from './pages/Beginner';
import Medium from './pages/Medium';
import Hard from './pages/Hard';

function App() {
  return (
    <PuzzleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PuzzleGame />} />
          <Route path="/beginner" element={<Beginner />} />
          <Route path="/medium" element={<Medium />} />
          <Route path="/hard" element={<Hard />} />
        </Routes>
      </Router>
    </PuzzleProvider>
  );
}

export default App;
