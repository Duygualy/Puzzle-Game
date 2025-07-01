import { createContext, useContext, useState } from "react";

const PuzzleContext = createContext();

export function PuzzleProvider({ children }) {
  const [completedPuzzles, setCompletedPuzzles] = useState([]);

  const completePuzzle = (puzzleId) => {
    setCompletedPuzzles((prev) =>
      prev.includes(puzzleId) ? prev : [...prev, puzzleId]
    );
  };

  return (
    <PuzzleContext.Provider value={{ completedPuzzles, completePuzzle }}>
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzle() {
  return useContext(PuzzleContext);
}
