// types/index.ts
export type GameMode = 'custom' | 'template';

export interface BingoBox {
  id: string;
  displayNumber?: number;      // For template mode
  imagePath?: string;          // For custom mode
  imageData?: string;          // Base64 or Blob URL
  isOpened: boolean;
  isCenter: boolean;
  position: { row: number; col: number };
  mode: GameMode;
}

export interface TemplateStyle {
  fontSize: string;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  openedColor?: string;
  openedBackgroundColor?: string;
}

export interface BingoConfig {
  gridSize: number;
  mode: GameMode;
  centerLogo: string;
  // Custom mode
  assets: Array<{
    id: string;
    file: File;
    preview: string;
  }>;
  // Template mode
  templateConfig?: {
    numbers: number[];         // Randomized array
    style: TemplateStyle;
  };
  createdAt: Date;
}

export interface GameState {
  boxes: BingoBox[];
  openedCount: number;
  gridSize: number;
  mode: GameMode;
}

