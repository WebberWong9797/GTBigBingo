// utils/validation.ts
export const isOddNumber = (num: number): boolean => {
  return num % 2 !== 0;
};

export const hasCenterBox = (gridSize: number): boolean => {
  return isOddNumber(gridSize);
};

export const calculateRequiredAssets = (gridSize: number): number => {
  // For even grids, no center box, so all boxes need assets/numbers
  // For odd grids, center box is logo, so -1
  return hasCenterBox(gridSize) ? gridSize * gridSize - 1 : gridSize * gridSize;
};

export const validateGridSize = (size: number): string | null => {
  if (size < 3) return "Grid size must be at least 3";
  if (size > 11) return "Grid size too large (max 11)";
  return null;
};

