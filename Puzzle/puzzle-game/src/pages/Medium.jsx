import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PuzzlePiece from "../components/PuzzlePiece2";
import img from "../assets/berry.jpg";
import "../style/PuzzleGame.css";
import { useNavigate } from "react-router-dom";
import { usePuzzle } from "../components/PuzzleContext";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Medium() {
  const totalPieces = 48;
  const [pieces, setPieces] = useState(() =>
    shuffle([...Array(totalPieces).keys()])
  );

  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();
  const { completePuzzle } = usePuzzle();

  const handleDrop = (fromIndex, toIndex) => {
    setPieces((prev) => {
      const updated = [...prev];
      [updated[fromIndex], updated[toIndex]] = [
        updated[toIndex],
        updated[fromIndex],
      ];
      return updated;
    });
  };

  const isComplete = pieces.every((val, idx) => val === idx);

  useEffect(() => {
  if (isComplete) {
    setShowCongrats(true);
    completePuzzle("medium"); // ya da "hard"
    const timeout = setTimeout(() => {
      setShowCongrats(false);
      navigate("/");
    }, 3000);
    return () => clearTimeout(timeout);
  }
}, [isComplete, completePuzzle, navigate]);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="puzzle-container">
        {pieces.map((pieceID, idx) => (
          <PuzzlePiece
            key={pieceID}
            image={img}
            index={idx}
            correctIndex={pieceID}
            onDrop={handleDrop}
          />
        ))}
        {showCongrats && (
          <div className="congrats-overlay">
            <div className="congrats">
              <p>🎉 Beginner Puzzle tamamlandııı!</p>
            </div>
          </div>            
        )}
      </div>
    </DndProvider>
  );
}
