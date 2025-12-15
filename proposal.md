# Local Bingo Platform Proposal

## Project Overview

A local bingo platform application that allows users to create customizable bingo games with **two flexible modes**: 

1. **Custom Mode** - Upload your own images for personalized bingo experiences
2. **Template Mode** - Instantly generate numbered bingo cards with random positioning

The platform features a comprehensive settings configuration page and an interactive bingo game page with responsive design that fits any screen size.

### Quick Facts
- ✨ **Two Game Modes**: Custom images or numbered templates
- 🎲 **Random Generation**: Template mode shuffles numbers for unique layouts
- 📱 **Responsive Design**: Automatically scales to fit any screen
- 🎯 **Dual Input**: Click boxes or enter ID/number to reveal
- 🔧 **Highly Configurable**: Grid size, styling, and assets fully customizable
- 💾 **Local Storage**: No backend required, works offline
- 🎨 **Modern UI**: Beautiful animations and intuitive interface

---

## Core Features

### 1. System Setting Page

#### Bingo Table Configuration
- **Grid Size Control**: Users can configure the total size of the bingo table
  - **Constraint**: Grid size must be an odd number (e.g., 3x3, 5x5, 7x7, 9x9)
  - **Rationale**: Ensures a center box exists for the fixed logo
  - **Validation**: System prevents even numbers from being entered

#### Mode Selection
- **Custom Mode** (Default): User uploads custom images for each box
- **Template Mode**: System generates numbered boxes automatically
  - Boxes display numbers (1, 2, 3, etc.) instead of custom images
  - Numbers are randomly assigned to grid positions
  - Randomization happens during game generation in settings page
  - Each game session has different random number placement

#### Asset Management

**Custom Mode:**
- **Image Upload System**: Users must upload PNG images for all bingo boxes
  - **Required Assets**: Total boxes - 1 (center box reserved for logo)
  - **Example**: For a 5x5 grid, users must upload 24 images (25 boxes - 1 center logo)
  - **Validation**: Game cannot start without all required assets
  - **Error Handling**: Clear error messages if asset count is insufficient

**Template Mode:**
- **No Asset Upload Required**: System automatically generates numbered boxes
- **Number Range**: 1 to (gridSize² - 1)
  - Example: 5x5 grid = numbers 1-24 (excluding center logo)
- **Randomization**: 
  - Click "Generate" button to randomize number positions
  - Preview shows current random arrangement
  - Can regenerate multiple times until satisfied
- **Styling Options**: Choose number font, size, and color scheme

#### Configuration Summary
- Display current grid size
- Display selected mode (Custom/Template)
- Show asset upload progress for Custom mode (e.g., "18/24 images uploaded")
- Show number arrangement preview for Template mode
- Preview uploaded images or generated numbers
- Regenerate button for Template mode
- Save/Load configuration settings

---

### 2. Bingo Game Page

#### Table Layout
- **Responsive Design**: Bingo table automatically scales to fit screen size
  - All boxes must be visible without scrolling
  - Maintains aspect ratio and readability
  - Adapts to different screen resolutions

#### Center Box (Logo)
- **Fixed Position**: Always at the center of the grid
- **Pre-opened State**: Initially opened and non-interactive
- **Content**: Displays fixed logo/branding
- **Visual Distinction**: Clearly differentiated from playable boxes

#### Bingo Box Structure
Each box contains:
1. **Content**: PNG image asset (Custom mode) OR Number (Template mode)
2. **Unique ID**: Identifiable and unique identifier
3. **Display Number**: The number shown on the box (for Template mode)
4. **State**: Boolean flag indicating if box is opened/revealed
5. **Visual Feedback**: Clear indication of opened vs. closed state

**Custom Mode Box:**
- Displays custom uploaded image when opened
- Shows box ID when closed

**Template Mode Box:**
- Displays assigned number (1-24 for 5x5) when closed
- Shows same number with different styling when opened
- Number position is randomized during generation

#### Interaction Methods

**Method 1: Direct Click**
- Click on any closed box to reveal its content
- Visual animation on reveal
- Box remains open once revealed
- Works for both Custom and Template modes

**Method 2: Number Input** (Template Mode)
- Text field for entering the number shown on the box
- Submit to reveal the box with that number
- Validation for invalid/non-existent numbers
- Feedback for already-opened boxes
- Example: Enter "15" to open the box displaying number 15

**Method 3: ID Input** (Custom Mode)
- Text field for entering box ID (e.g., "A1", "B3")
- Submit to reveal corresponding box
- Validation for invalid/non-existent IDs
- Feedback for already-opened boxes

---

## Technical Specifications

### Data Structure

```javascript
// Bingo Configuration
{
  gridSize: number,        // Must be odd (3, 5, 7, 9, etc.)
  mode: 'custom' | 'template',  // Game mode
  centerLogo: string,      // Path to logo image
  assets: [                // Array of image assets (Custom mode only)
    {
      id: string,          // Unique identifier
      imagePath: string,   // Path to PNG file
      position: {x, y}     // Grid coordinates
    }
  ],
  templateConfig: {        // Template mode configuration
    numbers: number[],     // Randomized array of numbers
    style: {
      fontSize: string,
      fontFamily: string,
      color: string,
      backgroundColor: string
    }
  }
}

// Bingo Box
{
  id: string,              // Unique identifier (e.g., "A1", "B3")
  displayNumber: number,   // Number shown on box (Template mode)
  imagePath: string,       // PNG file path (Custom mode)
  isOpened: boolean,       // Reveal state
  isCenter: boolean,       // True for logo box
  position: {x, y},        // Grid coordinates
  mode: 'custom' | 'template'  // Box mode
}
```

### Validation Rules

1. **Grid Size**: Must be odd number (3, 5, 7, 9, etc.)
2. **Mode Selection**: Must choose Custom or Template mode
3. **Asset Count** (Custom mode): Must equal (gridSize² - 1)
4. **File Format** (Custom mode): All assets must be PNG format
5. **Number Range** (Template mode): Numbers must be 1 to (gridSize² - 1)
6. **Number Uniqueness** (Template mode): Each number appears exactly once
7. **Unique IDs**: Each box must have unique identifier
8. **Center Box**: Always reserved for logo
9. **Randomization** (Template mode): Numbers must be shuffled before game starts

---

## User Flow

### Setup Flow

**Custom Mode:**
1. User opens Settings Page
2. Selects "Custom Mode"
3. Selects grid size (odd number only)
4. Uploads required number of PNG images
5. System validates asset count
6. Preview uploaded images
7. Configuration saved
8. Navigate to Bingo Game Page

**Template Mode:**
1. User opens Settings Page
2. Selects "Template Mode"
3. Selects grid size (odd number only)
4. (Optional) Customize number styling
5. Click "Generate" to randomize number positions
6. Preview generated grid with random numbers
7. (Optional) Click "Regenerate" for different arrangement
8. Configuration saved with random positions
9. Navigate to Bingo Game Page

### Gameplay Flow

**Custom Mode:**
1. Bingo table loads with configured size
2. Center box displays logo (pre-opened)
3. All other boxes are closed, showing box IDs
4. User can:
   - Click on boxes to reveal them
   - Enter box ID (e.g., "A1") in text field to reveal
5. Revealed boxes display their associated images
6. Game continues until desired pattern/completion

**Template Mode:**
1. Bingo table loads with configured size
2. Center box displays logo (pre-opened)
3. All other boxes are closed, showing randomized numbers
4. User can:
   - Click on boxes to reveal them
   - Enter the number shown on box in text field to reveal
5. Revealed boxes show the same number with different styling (e.g., highlighted, larger, colored)
6. Numbers remain in their randomized positions throughout the game
7. Game continues until desired pattern/completion

---

## UI/UX Requirements

### Settings Page
- **Mode Selector**: Toggle or radio buttons to choose Custom/Template mode
- **Grid Size Selector**: Dropdown or number input with validation
- **Custom Mode UI**:
  - Asset Upload Area with drag-and-drop support
  - Multiple file selection
  - Progress indicator
  - Thumbnail previews with delete option
- **Template Mode UI**:
  - Number styling controls (font, size, color)
  - "Generate" button to randomize positions
  - "Regenerate" button to create new arrangement
  - Preview grid showing current number arrangement
  - Visual indicator of randomization
- **Validation Feedback**: Real-time error messages
- **Save Button**: Enabled only when configuration is valid

### Bingo Game Page
- **Mode Indicator**: Display current mode (Custom/Template)
- **Responsive Grid**: Automatically scales to screen
- **Box States**:
  - **Custom Mode**:
    - Closed: Show box ID (e.g., "A1")
    - Opened: Display full image
    - Center: Always show logo
  - **Template Mode**:
    - Closed: Show assigned number (e.g., "15")
    - Opened: Show same number with highlight/different style
    - Center: Always show logo
- **Input Field**: 
  - Text input with submit button
  - Label changes based on mode:
    - Custom: "Enter Box ID (e.g., A1)"
    - Template: "Enter Number (e.g., 15)"
  - Autocomplete suggestions
  - Error feedback for invalid inputs
- **Visual Feedback**:
  - Hover effects on closed boxes
  - Reveal animation
  - Clear distinction between states
  - Different styling for opened boxes in Template mode

---

## Technical Considerations

### Performance
- Optimize image loading for large grids
- Lazy loading for better performance
- Image compression for faster load times

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Clear focus indicators

### Storage
- Local storage for configuration
- Asset management system
- Configuration export/import capability

### Error Handling
- Graceful handling of missing assets
- Clear error messages
- Validation feedback
- Recovery options

---

## Technical Reference & Implementation Guide

### Recommended Technology Stack

#### Option 1: Web Application (Recommended)
**Best for**: Cross-platform compatibility, easy deployment, modern UI

**Frontend Framework:**
- **React.js** with **TypeScript**
  - Component-based architecture perfect for grid layout
  - Strong typing ensures data integrity
  - Rich ecosystem for UI components
  - Excellent developer experience

**State Management:**
- **Zustand** or **React Context API**
  - Lightweight state management
  - Easy to manage game state and configuration
  - Minimal boilerplate

**Styling:**
- **Tailwind CSS** + **Framer Motion**
  - Rapid UI development with utility classes
  - Smooth animations for box reveals
  - Responsive design utilities built-in
  - Modern, professional appearance

**File Handling:**
- **React Dropzone** for drag-and-drop uploads
- **Browser File API** for local file management
- **IndexedDB** via **Dexie.js** for storing images locally

**Build Tool:**
- **Vite**
  - Fast development server
  - Optimized production builds
  - Modern tooling

#### Option 2: Desktop Application
**Best for**: Offline-first, native performance

**Framework:**
- **Electron** + **React**
  - Full desktop application experience
  - Access to file system
  - Cross-platform (Windows, macOS, Linux)

#### Option 3: Mobile-First PWA
**Best for**: Mobile devices, installable web app

**Framework:**
- **React** + **PWA capabilities**
  - Installable on mobile devices
  - Offline support
  - Touch-optimized interactions

---

### Recommended Architecture

```
gtbigbingo/
├── src/
│   ├── components/
│   │   ├── Settings/
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── GridSizeSelector.tsx
│   │   │   ├── AssetUploader.tsx
│   │   │   └── AssetPreview.tsx
│   │   ├── Bingo/
│   │   │   ├── BingoPage.tsx
│   │   │   ├── BingoGrid.tsx
│   │   │   ├── BingoBox.tsx
│   │   │   └── IdInput.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── ErrorMessage.tsx
│   ├── hooks/
│   │   ├── useBingoConfig.ts
│   │   ├── useBingoState.ts
│   │   └── useImageLoader.ts
│   ├── store/
│   │   ├── configStore.ts
│   │   └── gameStore.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── imageUtils.ts
│   │   └── gridUtils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── logo.png
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

### Implementation Details

#### 1. State Management Structure

```typescript
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
```

#### 2. Core Utilities

```typescript
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

// utils/gridUtils.ts
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
  let assetIndex = 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isCenter = row === center.row && col === center.col;
      
      boxes.push({
        id: generateBoxId(row, col),
        imagePath: isCenter ? logoPath : assets[assetIndex]?.preview || '',
        imageData: isCenter ? logoPath : assets[assetIndex]?.preview,
        isOpened: isCenter,
        isCenter,
        position: { row, col },
        mode: 'custom'
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
        mode: 'template'
      });

      if (!isCenter) numberIndex++;
    }
  }

  return boxes;
};
```

#### 3. State Store (Zustand)

```typescript
// store/configStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

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
      logoPath: '/logo.png',
      
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
        const { gridSize, mode, assets, templateNumbers } = get();
        const required = calculateRequiredAssets(gridSize);
        
        if (mode === 'custom') {
          return assets.length === required && isOddNumber(gridSize);
        } else {
          return templateNumbers.length === required && isOddNumber(gridSize);
        }
      }
    }),
    { name: 'bingo-config' }
  )
);

// store/gameStore.ts
import create from 'zustand';

interface GameStore {
  boxes: BingoBox[];
  mode: GameMode;
  initializeGame: (boxes: BingoBox[], mode: GameMode) => void;
  openBox: (id: string) => void;
  openBoxByNumber: (number: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  boxes: [],
  mode: 'custom',
  
  initializeGame: (boxes, mode) => set({ boxes, mode }),
  
  openBox: (id) =>
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.id === id ? { ...box, isOpened: true } : box
      )
    })),
  
  openBoxByNumber: (number) =>
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.displayNumber === number ? { ...box, isOpened: true } : box
      )
    })),
  
  resetGame: () => set({ boxes: [], mode: 'custom' })
}));
```

#### 4. Key Components

```typescript
// components/Bingo/BingoGrid.tsx
import { useGameStore } from '../../store/gameStore';
import BingoBox from './BingoBox';

export const BingoGrid = () => {
  const boxes = useGameStore((state) => state.boxes);
  const gridSize = Math.sqrt(boxes.length);
  
  return (
    <div 
      className="grid gap-2 w-full h-full p-4"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        aspectRatio: '1/1',
        maxHeight: '90vh',
        maxWidth: '90vh'
      }}
    >
      {boxes.map((box) => (
        <BingoBox key={box.id} box={box} />
      ))}
    </div>
  );
};

// components/Bingo/BingoBox.tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useConfigStore } from '../../store/configStore';

interface Props {
  box: BingoBox;
}

export const BingoBox = ({ box }: Props) => {
  const openBox = useGameStore((state) => state.openBox);
  const templateStyle = useConfigStore((state) => state.templateStyle);
  
  const handleClick = () => {
    if (!box.isOpened && !box.isCenter) {
      openBox(box.id);
    }
  };
  
  // Render custom mode box
  if (box.mode === 'custom') {
    return (
      <motion.div
        className={`
          relative border-2 rounded-lg overflow-hidden cursor-pointer
          ${box.isCenter ? 'border-yellow-400' : 'border-gray-300'}
          ${!box.isOpened && !box.isCenter ? 'hover:border-blue-500' : ''}
        `}
        onClick={handleClick}
        whileHover={!box.isOpened && !box.isCenter ? { scale: 1.05 } : {}}
        whileTap={!box.isOpened && !box.isCenter ? { scale: 0.95 } : {}}
      >
        {box.isOpened ? (
          <motion.img
            src={box.imageData}
            alt={box.id}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-2xl font-bold text-gray-400">{box.id}</span>
          </div>
        )}
      </motion.div>
    );
  }
  
  // Render template mode box
  return (
    <motion.div
      className={`
        relative border-2 rounded-lg overflow-hidden cursor-pointer
        ${box.isCenter ? 'border-yellow-400' : 'border-gray-300'}
        ${!box.isOpened && !box.isCenter ? 'hover:border-blue-500' : ''}
      `}
      onClick={handleClick}
      whileHover={!box.isOpened && !box.isCenter ? { scale: 1.05 } : {}}
      whileTap={!box.isOpened && !box.isCenter ? { scale: 0.95 } : {}}
      style={{
        backgroundColor: box.isOpened 
          ? templateStyle.openedBackgroundColor 
          : templateStyle.backgroundColor
      }}
    >
      {box.isCenter ? (
        <img
          src={box.imageData}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      ) : (
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={box.isOpened ? { scale: 0.8 } : {}}
          animate={box.isOpened ? { scale: 1.2 } : {}}
          transition={{ duration: 0.3 }}
        >
          <span
            style={{
              fontSize: box.isOpened ? '3rem' : templateStyle.fontSize,
              fontFamily: templateStyle.fontFamily,
              color: box.isOpened ? templateStyle.openedColor : templateStyle.color,
              fontWeight: box.isOpened ? 'bold' : 'normal'
            }}
          >
            {box.displayNumber}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
```

#### 5. Settings Page Components

```typescript
// components/Settings/TemplateGenerator.tsx
import { useConfigStore } from '../../store/configStore';
import { useState } from 'react';

export const TemplateGenerator = () => {
  const { gridSize, templateNumbers, generateRandomNumbers, templateStyle, setTemplateStyle } = 
    useConfigStore();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateRandomNumbers();
      setIsGenerating(false);
    }, 300);
  };
  
  const totalBoxes = gridSize * gridSize;
  const centerIndex = Math.floor(totalBoxes / 2);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Template Configuration</h3>
        
        {/* Style Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <input
              type="text"
              value={templateStyle.fontSize}
              onChange={(e) => setTemplateStyle({ fontSize: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="2rem"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Font Family</label>
            <select
              value={templateStyle.fontFamily}
              onChange={(e) => setTemplateStyle({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <input
              type="color"
              value={templateStyle.color}
              onChange={(e) => setTemplateStyle({ color: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="color"
              value={templateStyle.backgroundColor}
              onChange={(e) => setTemplateStyle({ backgroundColor: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Opened Text Color</label>
            <input
              type="color"
              value={templateStyle.openedColor}
              onChange={(e) => setTemplateStyle({ openedColor: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Opened Background</label>
            <input
              type="color"
              value={templateStyle.openedBackgroundColor}
              onChange={(e) => setTemplateStyle({ openedBackgroundColor: e.target.value })}
              className="w-full h-10 border rounded"
            />
          </div>
        </div>
        
        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold
                     hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {isGenerating ? 'Generating...' : templateNumbers.length > 0 ? 'Regenerate Numbers' : 'Generate Numbers'}
        </button>
      </div>
      
      {/* Preview Grid */}
      {templateNumbers.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-3">Preview</h4>
          <div 
            className="grid gap-1 border-2 border-gray-300 rounded-lg p-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              aspectRatio: '1/1',
              maxWidth: '400px'
            }}
          >
            {Array.from({ length: totalBoxes }).map((_, index) => {
              const isCenter = index === centerIndex;
              const numberIndex = index < centerIndex ? index : index - 1;
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-center rounded border"
                  style={{
                    backgroundColor: isCenter ? '#fef3c7' : templateStyle.backgroundColor,
                    color: templateStyle.color,
                    fontSize: '0.8rem',
                    fontFamily: templateStyle.fontFamily,
                    minHeight: '40px'
                  }}
                >
                  {isCenter ? '★' : templateNumbers[numberIndex]}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ★ = Center logo position
          </p>
        </div>
      )}
    </div>
  );
};

// components/Settings/ModeSelector.tsx
import { useConfigStore } from '../../store/configStore';

export const ModeSelector = () => {
  const { mode, setMode } = useConfigStore();
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">Game Mode</label>
      <div className="flex gap-4">
        <button
          onClick={() => setMode('custom')}
          className={`
            flex-1 py-4 px-6 rounded-lg border-2 transition-all
            ${mode === 'custom' 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'}
          `}
        >
          <div className="font-semibold text-lg">Custom Mode</div>
          <div className="text-sm mt-1">Upload your own images</div>
        </button>
        
        <button
          onClick={() => setMode('template')}
          className={`
            flex-1 py-4 px-6 rounded-lg border-2 transition-all
            ${mode === 'template' 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'}
          `}
        >
          <div className="font-semibold text-lg">Template Mode</div>
          <div className="text-sm mt-1">Use numbered boxes</div>
        </button>
      </div>
    </div>
  );
};
```

#### 6. Input Component with Mode Support

```typescript
// components/Bingo/NumberInput.tsx
import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export const NumberInput = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { boxes, mode, openBox, openBoxByNumber } = useGameStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!input.trim()) {
      setError('Please enter a value');
      return;
    }
    
    if (mode === 'template') {
      // Handle number input
      const number = parseInt(input);
      if (isNaN(number)) {
        setError('Please enter a valid number');
        return;
      }
      
      const box = boxes.find(b => b.displayNumber === number);
      if (!box) {
        setError(`Number ${number} not found`);
        return;
      }
      
      if (box.isOpened) {
        setError(`Number ${number} is already opened`);
        return;
      }
      
      openBoxByNumber(number);
      setInput('');
    } else {
      // Handle ID input (custom mode)
      const box = boxes.find(b => b.id === input.toUpperCase());
      if (!box) {
        setError(`Box ID "${input}" not found`);
        return;
      }
      
      if (box.isOpened) {
        setError(`Box ${input} is already opened`);
        return;
      }
      
      openBox(input.toUpperCase());
      setInput('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'template' ? 'Enter number (e.g., 15)' : 'Enter box ID (e.g., A1)'}
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                     focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors font-semibold"
        >
          Open
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </form>
  );
};
```

---

### Development Workflow

#### Step 1: Project Setup
```bash
# Create Vite + React + TypeScript project
npm create vite@latest gtbigbingo -- --template react-ts
cd gtbigbingo
npm install

# Install dependencies
npm install zustand react-dropzone framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Step 2: Configure Tailwind
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Step 3: Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

### Testing Strategy

**Unit Tests:**
- Validation functions (grid size, asset count)
- Grid utilities (ID generation, center calculation, number randomization)
- State management logic
- Number shuffling algorithm

**Integration Tests:**
- Settings page workflow (both modes)
- Asset upload and validation (custom mode)
- Template generation and randomization (template mode)
- Game initialization for both modes

**E2E Tests:**
- Complete user flow from setup to gameplay (both modes)
- Box reveal interactions
- ID/Number input functionality
- Mode switching and configuration persistence

**Tools:**
- **Vitest** for unit tests
- **React Testing Library** for component tests
- **Playwright** for E2E tests

---

### Performance Optimization

1. **Image Optimization:**
   - Compress images on upload
   - Use WebP format when possible
   - Implement lazy loading for large grids

2. **Rendering:**
   - Memoize BingoBox components
   - Use React.memo for pure components
   - Virtualize very large grids (9x9+)

3. **Storage:**
   - Store images as compressed base64
   - Implement cleanup for unused assets
   - Use IndexedDB for large datasets

---

### Deployment Options

**Option 1: Static Hosting**
- **Netlify** or **Vercel** (free tier available)
- Simple drag-and-drop deployment
- Automatic HTTPS
- Perfect for web version

**Option 2: Desktop App**
- Package with Electron
- Distribute via GitHub Releases
- Platform-specific installers

**Option 3: Self-Hosted**
- Host on local server
- Use Nginx or Apache
- Full control over environment

---

### Why This Stack?

✅ **React + TypeScript**: Type safety prevents bugs, component model fits grid structure perfectly

✅ **Vite**: Lightning-fast development, optimized builds

✅ **Zustand**: Simple state management without Redux complexity

✅ **Tailwind CSS**: Rapid styling, responsive utilities built-in

✅ **Framer Motion**: Smooth animations with minimal code

✅ **Local Storage**: No backend needed, fully offline capable

✅ **Modern Web APIs**: File handling, image processing all in browser

---

## Mode Comparison

| Feature | Custom Mode | Template Mode |
|---------|-------------|---------------|
| **Setup Time** | Longer (requires asset upload) | Instant (auto-generated) |
| **Asset Requirement** | PNG images for all boxes | None |
| **Box Content** | Custom images | Numbers (1, 2, 3...) |
| **Closed Box Display** | Box ID (A1, B2, etc.) | Assigned number |
| **Opened Box Display** | Full image reveal | Highlighted number |
| **Input Method** | Box ID (e.g., "A1") | Number (e.g., "15") |
| **Randomization** | Asset order by user | Automatic number shuffle |
| **Regeneration** | Manual re-upload | One-click regenerate |
| **Styling Options** | Image-based | Font, color, size controls |
| **Best For** | Photo bingo, branded games | Quick setup, traditional bingo |
| **Preparation Needed** | High | None |
| **Flexibility** | Maximum customization | Quick deployment |

---

## Template Mode Feature Summary

The Template Mode is a powerful alternative to Custom Mode that eliminates the need for asset preparation:

### Key Features:
- **No Asset Upload Required**: Instantly create a bingo game without preparing images
- **Random Number Generation**: Numbers 1 to N are automatically generated and shuffled
- **Position Randomization**: Each generation creates a unique layout
- **Customizable Styling**: Control font, size, colors for both closed and opened states
- **Preview System**: See the random arrangement before starting the game
- **Regeneration**: Don't like the layout? Click regenerate for a new random arrangement
- **Number-Based Input**: Players can enter numbers directly to reveal boxes

### Use Cases:
- **Quick Setup**: Start a game in seconds without preparing assets
- **Traditional Bingo**: Perfect for number-based bingo games
- **Testing**: Quickly test game mechanics without asset preparation
- **Educational**: Use for number recognition games
- **Events**: Rapid deployment for spontaneous activities

### Technical Highlights:
- Uses Fisher-Yates shuffle algorithm for true randomization
- Numbers are assigned during configuration, not gameplay
- Each game session maintains its random layout throughout
- Styling is customizable and persistent

---

## Future Enhancements (Optional)

1. **Winning Patterns**: Define and detect bingo patterns (rows, columns, diagonals, full card)
2. **Multiple Games**: Save and load different configurations
3. **Sound Effects**: Audio feedback for interactions
4. **Statistics**: Track opened boxes and game progress
5. **Themes**: Customizable color schemes and presets
6. **Animation Options**: Configurable reveal animations
7. **Multi-language Support**: Internationalization
8. **Export/Share**: Share game configurations
9. **Hybrid Mode**: Combine numbers with images
10. **Auto-Call**: Automatic number calling feature for Template mode
11. **History**: Track which numbers/boxes have been called

---

## Development Phases

### Phase 1: Core Functionality
- Settings page with grid size configuration
- Mode selection (Custom/Template)
- Asset upload and validation (Custom mode)
- Basic bingo table rendering
- Click-to-reveal functionality

### Phase 2: Template Mode Implementation
- Template number generation with randomization
- Number shuffling algorithm
- Template styling controls
- Preview grid for template mode
- Number-based input system

### Phase 3: Enhanced Interaction
- ID/Number input system for both modes
- Responsive design implementation
- Visual animations and feedback
- Mode-specific UI adaptations
- Error handling and validation

### Phase 4: Polish & Optimization
- Performance optimization
- Accessibility improvements
- UI/UX refinements
- Testing and bug fixes
- Configuration persistence

---

## Success Criteria

1. ✅ Users can configure grid size (odd numbers only)
2. ✅ Users can choose between Custom and Template modes
3. ✅ System validates asset count matches requirements (Custom mode)
4. ✅ Template mode generates randomized number positions
5. ✅ Users can regenerate random arrangements in Template mode
6. ✅ Bingo table fits entirely on screen
7. ✅ Center box displays logo and is pre-opened
8. ✅ Users can reveal boxes by clicking
9. ✅ Users can reveal boxes by entering ID (Custom) or Number (Template)
10. ✅ All boxes have unique identifiers
11. ✅ Numbers are randomly positioned and unique (Template mode)
12. ✅ Clear error messages for invalid configurations
13. ✅ Smooth and intuitive user experience
14. ✅ Mode-specific UI adapts correctly

---

## Conclusion

This local bingo platform provides a flexible and user-friendly system for creating custom bingo games with two distinct modes:

**Custom Mode** allows users to upload their own images for a personalized experience, perfect for photo-based bingo games, educational content, or branded events.

**Template Mode** offers a quick-start option with numbered boxes that are randomly positioned during setup, ideal for traditional number-based bingo or when custom assets aren't available.

The odd-number grid constraint ensures a centered logo position, while the dual interaction methods (click and ID/number input) offer flexibility for different use cases. The randomization feature in Template mode ensures each game session has a unique layout, adding variety and replayability. The validation system ensures game integrity by requiring all assets (Custom mode) or proper number generation (Template mode) before gameplay begins.

Both modes share the same intuitive interface and responsive design, making it easy to switch between them based on your needs.

