// utils/gridUtils.ts
import { BingoBox, GameMode } from '../types';

export const generateBoxId = (row: number, col: number): string => {
  const letter = String.fromCharCode(65 + row); // A, B, C...
  return `${letter}${col + 1}`; // A1, A2, B1, etc.
};

export const getCenterPosition = (gridSize: number): { row: number; col: number } | null => {
  // Only odd grids have a true center
  if (gridSize % 2 === 0) {
    return null;
  }
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
// Numbers can be repeated
export const generateRandomNumbers = (gridSize: number): number[] => {
  // For even grids, all boxes need numbers (no center)
  // For odd grids, center box is logo, so -1
  const totalBoxes = gridSize % 2 === 0 ? gridSize * gridSize : gridSize * gridSize - 1;
  
  // Generate random numbers with possible repeats
  // Using numbers from 1 to gridSize*gridSize range, allowing duplicates
  const maxNumber = gridSize * gridSize;
  const numbers: number[] = [];
  for (let i = 0; i < totalBoxes; i++) {
    numbers.push(Math.floor(Math.random() * maxNumber) + 1);
  }
  return numbers;
};

// Initialize grid for custom mode
// Assets/pictures can be repeated
export const initializeCustomGrid = (
  gridSize: number,
  assets: Array<{ id: string; preview: string }>,
  logoPath: string
): BingoBox[] => {
  const boxes: BingoBox[] = [];
  const center = getCenterPosition(gridSize);
  
  // If no assets, all boxes will use logo
  const hasAssets = assets.length > 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isCenter = center !== null && row === center.row && col === center.col;
      
      // For center box, always use logo
      // For other boxes, randomly select from assets (with replacement) or use logo if no assets
      let imagePath = logoPath;
      if (!isCenter && hasAssets) {
        // Randomly select an asset (allowing repeats)
        const randomIndex = Math.floor(Math.random() * assets.length);
        imagePath = assets[randomIndex]?.preview || logoPath;
      }
      
      boxes.push({
        id: generateBoxId(row, col),
        imagePath: imagePath || logoPath,
        imageData: imagePath || logoPath,
        isOpened: isCenter,
        isCenter,
        position: { row, col },
        mode: 'custom' as GameMode
      });
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
      const isCenter = center !== null && row === center.row && col === center.col;
      
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

