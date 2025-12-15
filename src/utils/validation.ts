// utils/validation.ts
export const isOddNumber = (num: number): boolean => {
  return num % 2 !== 0;
};

export const calculateRequiredAssets = (gridSize: number): number => {
  return gridSize * gridSize - 1; // -1 for center logo
};

export const validateGridSize = (size: number): string | null => {
  if (size < 3) return "Grid size must be at least 3";
  if (size > 11) return "Grid size too large (max 11)";
  if (!isOddNumber(size)) return "Grid size must be odd";
  return null;
};

