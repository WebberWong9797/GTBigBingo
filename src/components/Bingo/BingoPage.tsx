// components/Bingo/BingoPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigStore } from '../../store/configStore';
import { useGameStore } from '../../store/gameStore';
import { initializeCustomGrid, initializeTemplateGrid, generateRandomNumbers } from '../../utils/gridUtils';
import { BingoGrid } from './BingoGrid';
import { Button } from '../shared/Button';

export const BingoPage = () => {
  const navigate = useNavigate();
  const { 
    mode, 
    gridSize, 
    assets,
    templateNumbers, 
    logoPath,
    isConfigValid 
  } = useConfigStore();
  const { initializeGame, resetGame, restartGame, boxes } = useGameStore();

  useEffect(() => {
    // Redirect if config is not valid
    if (!isConfigValid()) {
      navigate('/');
      return;
    }

    // Initialize game if not already initialized
    if (boxes.length === 0) {
      if (mode === 'custom') {
        const grid = initializeCustomGrid(gridSize, assets, logoPath);
        initializeGame(grid, mode);
      } else {
        const grid = initializeTemplateGrid(gridSize, templateNumbers, logoPath);
        initializeGame(grid, mode);
      }
    }
  }, [mode, gridSize, assets, templateNumbers, logoPath, isConfigValid, navigate, initializeGame, boxes.length]);

  const handleReset = () => {
    resetGame();
    navigate('/');
  };

  const handleRestart = () => {
    if (window.confirm('Restart the game? The grid will be reshuffled and all progress will be lost.')) {
      // Regenerate grid with new shuffle
      const regenerateGrid = () => {
        if (mode === 'custom') {
          return initializeCustomGrid(gridSize, assets, logoPath);
        } else {
          // Generate new random numbers for template mode
          const newRandomNumbers = generateRandomNumbers(gridSize);
          return initializeTemplateGrid(gridSize, newRandomNumbers, logoPath);
        }
      };
      
      restartGame(regenerateGrid);
    }
  };

  const openedCount = boxes.filter(b => b.isOpened && !b.isCenter).length;
  const totalBoxes = boxes.filter(b => !b.isCenter).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-shrink-0 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bingo Game</h1>
              <p className="text-sm text-gray-600">
                Mode: <span className="font-semibold">{mode === 'custom' ? 'Custom' : 'Template'}</span>
                {' | '}
                Opened: <span className="font-semibold">{openedCount} / {totalBoxes}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRestart} variant="danger">
                🔄 Restart & Shuffle
              </Button>
              <Button onClick={handleReset} variant="secondary">
                Back to Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <BingoGrid />
      </div>

      {openedCount === totalBoxes && (
        <div className="flex-shrink-0 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
              <h2 className="text-xl font-bold text-green-700 mb-1">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-green-600 text-sm">
                You've opened all boxes!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

