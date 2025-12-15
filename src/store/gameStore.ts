// store/gameStore.ts
import { create } from 'zustand';
import { BingoBox, GameMode } from '../types';

interface GameStore {
  boxes: BingoBox[];
  mode: GameMode;
  isShuffling: boolean;
  initializeGame: (boxes: BingoBox[], mode: GameMode) => void;
  openBox: (id: string) => void;
  openBoxByNumber: (number: number) => void;
  restartGame: (regenerateGrid?: () => BingoBox[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  boxes: [],
  mode: 'custom',
  isShuffling: false,
  
  initializeGame: (boxes, mode) => {
    set({ 
      boxes,
      mode,
      isShuffling: false
    });
  },
  
  openBox: (id) => {
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.id === id ? { ...box, isOpened: true } : box
      )
    }));
  },
  
  openBoxByNumber: (number) => {
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.displayNumber === number ? { ...box, isOpened: true } : box
      )
    }));
  },
  
  restartGame: (regenerateGrid) => {
    // If regenerateGrid function is provided, regenerate and shuffle the grid
    if (regenerateGrid) {
      // First, set shuffling state and close all boxes
      set({ isShuffling: true });
      set((state) => ({
        boxes: state.boxes.map(box => ({
          ...box,
          isOpened: box.isCenter // Only center boxes remain open
        }))
      }));
      
      // Wait for flip animation to complete (0.6s) plus a small buffer, then regenerate
      setTimeout(() => {
        const newGrid = regenerateGrid();
        const { mode } = get();
        get().initializeGame(newGrid, mode);
      }, 700); // Slightly longer than animation duration
    } else {
      // Otherwise, just reset the opened state
      set((state) => ({
        boxes: state.boxes.map(box => ({
          ...box,
          isOpened: box.isCenter // Only center boxes remain open
        }))
      }));
    }
  },
  
  resetGame: () => set({ 
    boxes: [], 
    mode: 'custom',
    isShuffling: false
  })
}));

