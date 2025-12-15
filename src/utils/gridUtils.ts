// utils/gridUtils.ts
import { BingoBox, GameMode } from '../types';

export const generateBoxId = (row: number, col: number): string => {
  const letter = String.fromCharCode(65 + row); // A, B, C...
  return `${letter}${col + 1}`; // A1, A2, B1, etc.
};

export const getCenterPosition = (gridSize: number) => {
  const center = Math.floor(gridSize / 2);
  return { row: center, col: center };
};

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate random number array for template mode
export const generateRandomNumbers = (gridSize: number): number[] => {
  const totalBoxes = gridSize * gridSize - 1; // -1 for center
  const numbers = Array.from({ length: totalBoxes }, (_, i) => i + 1);
  return shuffleArray(numbers);
};

// Initialize grid for custom mode
export const initializeCustomGrid = (
  gridSize: number,
  assets: Array<{ id: string; preview: string }>,
  logoPath: string
): BingoBox[] => {
  const boxes: BingoBox[] = [];
  const center = getCenterPosition(gridSize);
  
  // Shuffle assets for random placement
  const shuffledAssets = shuffleArray(assets);
  let assetIndex = 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isCenter = row === center.row && col === center.col;
      
      // Use asset if available, otherwise use logo
      const hasAsset = assetIndex < shuffledAssets.length;
      const imagePath = isCenter ? logoPath : (hasAsset ? shuffledAssets[assetIndex]?.preview : logoPath);
      
      boxes.push({
        id: generateBoxId(row, col),
        imagePath: imagePath || logoPath,
        imageData: imagePath || logoPath,
        isOpened: isCenter,
        isCenter,
        position: { row, col },
        mode: 'custom' as GameMode
      });

      if (!isCenter) assetIndex++;
    }
  }

  return boxes;
};

// Initialize grid for template mode
export const initializeTemplateGrid = (
  gridSize: number,
  randomNumbers: number[],
  logoPath: string
): BingoBox[] => {
  const boxes: BingoBox[] = [];
  const center = getCenterPosition(gridSize);
  let numberIndex = 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isCenter = row === center.row && col === center.col;
      
      boxes.push({
        id: generateBoxId(row, col),
        displayNumber: isCenter ? undefined : randomNumbers[numberIndex],
        imagePath: isCenter ? logoPath : undefined,
        imageData: isCenter ? logoPath : undefined,
        isOpened: isCenter,
        isCenter,
        position: { row, col },
        mode: 'template' as GameMode
      });

      if (!isCenter) numberIndex++;
    }
  }

  return boxes;
};

