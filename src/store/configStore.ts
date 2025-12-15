// store/configStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameMode, TemplateStyle } from '../types';
import { calculateRequiredAssets, isOddNumber } from '../utils/validation';
import { generateRandomNumbers } from '../utils/gridUtils';

interface ConfigStore {
  gridSize: number;
  mode: GameMode;
  assets: Array<{ id: string; file: File; preview: string }>;
  templateNumbers: number[];
  templateStyle: TemplateStyle;
  logoPath: string;
  setMode: (mode: GameMode) => void;
  setGridSize: (size: number) => void;
  addAssets: (files: File[]) => Promise<void>;
  removeAsset: (id: string) => void;
  clearAssets: () => void;
  generateRandomNumbers: () => void;
  setTemplateStyle: (style: Partial<TemplateStyle>) => void;
  isConfigValid: () => boolean;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      gridSize: 5,
      mode: 'custom',
      assets: [],
      templateNumbers: [],
      templateStyle: {
        fontSize: '2rem',
        fontFamily: 'Arial, sans-serif',
        color: '#374151',
        backgroundColor: '#f3f4f6',
        openedColor: '#ffffff',
        openedBackgroundColor: '#3b82f6'
      },
      logoPath: '/logo.svg',
      
      setMode: (mode) => set({ mode, assets: [], templateNumbers: [] }),
      
      setGridSize: (size) => set({ gridSize: size, assets: [], templateNumbers: [] }),
      
      addAssets: async (files) => {
        const newAssets = await Promise.all(
          files.map(async (file, index) => ({
            id: `asset-${Date.now()}-${index}`,
            file,
            preview: URL.createObjectURL(file)
          }))
        );
        set((state) => ({ assets: [...state.assets, ...newAssets] }));
      },
      
      removeAsset: (id) => 
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== id)
        })),
      
      clearAssets: () => set({ assets: [] }),
      
      generateRandomNumbers: () => {
        const { gridSize } = get();
        const numbers = generateRandomNumbers(gridSize);
        set({ templateNumbers: numbers });
      },
      
      setTemplateStyle: (style) =>
        set((state) => ({
          templateStyle: { ...state.templateStyle, ...style }
        })),
      
      isConfigValid: () => {
        const { gridSize, mode, templateNumbers } = get();
        
        if (mode === 'custom') {
          // Allow any number of assets (including 0 - all boxes will be logos)
          return isOddNumber(gridSize);
        } else {
          const required = calculateRequiredAssets(gridSize);
          return templateNumbers.length === required && isOddNumber(gridSize);
        }
      }
    }),
    { name: 'bingo-config' }
  )
);

