// components/Bingo/BingoGrid.tsx
import { useGameStore } from '../../store/gameStore';
import { BingoBox } from './BingoBox';

export const BingoGrid = () => {
  const boxes = useGameStore((state) => state.boxes);
  const gridSize = Math.sqrt(boxes.length);
  
  return (
    <div 
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        aspectRatio: '1/1',
        width: 'min(95vw, calc(100vh - 120px))',
        height: 'min(95vw, calc(100vh - 120px))',
        maxWidth: '1000px',
        maxHeight: '1000px'
      }}
    >
      {boxes.map((box) => (
        <BingoBox key={box.id} box={box} />
      ))}
    </div>
  );
};

