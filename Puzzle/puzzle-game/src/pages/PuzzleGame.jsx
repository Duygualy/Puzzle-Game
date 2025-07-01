import { Heart, Star, Sparkles, Lock, CheckCircle } from 'lucide-react';
import '../style/PuzzleGame.css';
import { useNavigate } from 'react-router-dom';
import { usePuzzle } from '../components/PuzzleContext';

const PuzzleGame = () => {
  const { completedPuzzles } = usePuzzle();
  const navigate = useNavigate();

  const puzzles = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'It was just too easy.',
      difficulty: 1,
      icon: Heart,
    },
    {
      id: 'medium',
      title: 'Medium',
      subtitle: 'Okey but you can not solve the next!',
      difficulty: 2,
      icon: Star,
    },
    {
      id: 'hard',
      title: 'Hard',
      subtitle: 'You are really legendary!',
      difficulty: 3,
      icon: Sparkles,
    }
  ];

  const PuzzleCard = ({ puzzle }) => {
    const Icon = puzzle.icon;
    const isCompleted = completedPuzzles.includes(puzzle.id);
    const isLocked = puzzle.difficulty > 1 && !completedPuzzles.includes(puzzles[puzzle.difficulty - 2].id);

    const handleCardClick = () => {
      if (!isLocked) navigate(`/${puzzle.id}`);
    };

    return (
      <div
        className={`puzzle-card group ${isLocked ? 'locked' : ''}`}
        onClick={handleCardClick}
      >
        <div className={`card-gradient ${puzzle.id}`}>
          <div className="card-header">
            <div className={`icon-wrapper ${isLocked ? '' : 'hover-bg'}`}>
              {isLocked ? (
                <Lock className="icon" />
              ) : isCompleted ? (
                <CheckCircle className="icon" />
              ) : (
                <Icon className="icon" />
              )}
            </div>
            <div className="dots">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`dot ${i < puzzle.difficulty ? 'filled' : 'empty'}`} />
              ))}
            </div>
          </div>

          <h3 className="title">{puzzle.title}</h3>
          <h4 className="subtitle">{puzzle.subtitle}</h4>
          <p className="desc">{puzzle.description}</p>

          {isLocked && (
            <div className="overlay">
              <div className="lock-text">
                <Lock className="overlay-icon" />
                <p>Complete previous puzzle</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="main-screen">
      <div className="floating-hearts">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 120}%`,
              top: `${Math.random() * 120}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="header">
          <div className="icon-title">
            <div className="icon-bg beginner"><Heart/></div>
            <h1 className="gradient-title">Puzzle Game</h1>
          </div>
          <p className="subtitle">Three special puzzles await you, each one bringing you a step closer to discovering something wonderful.</p>
        </div>

        <div className="cards-grid">
          {puzzles.map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>

        {completedPuzzles.length === 3 && (
          <div className="completion-msg">
            <Sparkles className="completion-icon" />
            <h2>Congratulations, Beautiful! 🎉</h2>
            <p>You've completed all the puzzles! Your final surprise awaits... 💖</p>
          </div>
        )}

        <footer className="footer">
          <p>Made with hate just for you</p>
        </footer>
      </div>
    </div>
  );
};

export default PuzzleGame;
