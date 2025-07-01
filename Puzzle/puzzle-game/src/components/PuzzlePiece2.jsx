import { useDrag, useDrop } from "react-dnd";

const PIECE_WIDTH = 86;
const PIECE_HEIGHT = 86;
const COLS = 6;

export default function PuzzlePiece({ image, index, correctIndex, onDrop }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: () => ({ index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      if (item.index !== index) {
        onDrop(item.index, index);
      }
    },
  });

  const visualCol = correctIndex % COLS;
  const visualRow = Math.floor(correctIndex / COLS);

  const style = {
    width: `${PIECE_WIDTH}px`,
    height: `${PIECE_HEIGHT}px`,
    position: "absolute",
    left: `${(index % COLS) * PIECE_WIDTH}px`,
    top: `${Math.floor(index / COLS) * PIECE_HEIGHT}px`,
    opacity: isDragging ? 0.4 : 1,
    backgroundImage: `url(${image})`,
    backgroundSize: `${PIECE_WIDTH * COLS}px auto`,
    backgroundPosition: `-${visualCol * PIECE_WIDTH}px -${visualRow * PIECE_HEIGHT}px`,
    backgroundRepeat: "no-repeat",
    cursor: "grab",
    border: "1px solid #ccc",
  };

  return <div ref={(node) => drag(drop(node))} style={style} />;
}
