// store/configStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameMode, TemplateStyle } from '../types';
import { calculateRequiredAssets } from '../utils/validation';
import { generateRandomNumbers } from '../utils/gridUtils';
import { 
  storeAsset, 
  removeAssetFromStorage, 
  clearAllAssets as clearStorage
} from '../utils/assetStorage';

interface ConfigStore {
  gridSize: number;
  mode: GameMode;
  assets: Array<{ id: string; file: File; preview: string }>;
  templateNumbers: number[];
  templateStyle: TemplateStyle;
  logoPath: string;
  setMode: (mode: GameMode) => Promise<void>;
  setGridSize: (size: number) => Promise<void>;
  addAssets: (files: File[]) => Promise<void>;
  removeAsset: (id: string) => Promise<void>;
  clearAssets: () => Promise<void>;
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
      
      setMode: async (mode) => {
        const { assets } = get();
        // Revoke all Blob URLs
        assets.forEach(asset => {
          if (asset.preview) {
            URL.revokeObjectURL(asset.preview);
          }
        });
        // Clear IndexedDB
        await clearStorage();
        set({ mode, assets: [], templateNumbers: [] });
      },
      
      setGridSize: async (size) => {
        const { assets } = get();
        // Revoke all Blob URLs
        assets.forEach(asset => {
          if (asset.preview) {
            URL.revokeObjectURL(asset.preview);
          }
        });
        // Clear IndexedDB
        await clearStorage();
        set({ gridSize: size, assets: [], templateNumbers: [] });
      },
      
      addAssets: async (files) => {
        const newAssets = await Promise.all(
          files.map(async (file, index) => {
            const id = `asset-${Date.now()}-${index}`;
            // Store in IndexedDB
            await storeAsset(id, file);
            // Create Blob URL for preview
            const preview = URL.createObjectURL(file);
            return {
              id,
              file,
              preview
            };
          })
        );
        set((state) => ({ assets: [...state.assets, ...newAssets] }));
      },
      
      removeAsset: async (id) => {
        const { assets } = get();
        const asset = assets.find(a => a.id === id);
        
        // Revoke Blob URL to free memory
        if (asset?.preview) {
          URL.revokeObjectURL(asset.preview);
        }
        
        // Remove from IndexedDB
        await removeAssetFromStorage(id);
        
        // Remove from state
        set({
          assets: assets.filter((a) => a.id !== id)
        });
      },
      
      clearAssets: async () => {
        const { assets } = get();
        
        // Revoke all Blob URLs to free memory
        assets.forEach(asset => {
          if (asset.preview) {
            URL.revokeObjectURL(asset.preview);
          }
        });
        
        // Clear IndexedDB storage
        await clearStorage();
        
        // Clear state
        set({ assets: [] });
      },
      
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
          return true;
        } else {
          const required = calculateRequiredAssets(gridSize);
          return templateNumbers.length === required;
        }
      }
    }),
    { name: 'bingo-config' }
  )
);

