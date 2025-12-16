# GT Big Bingo

A local bingo platform with two flexible game modes: Custom (image-based) and Template (number-based). Built with React, TypeScript, and modern web technologies.

## Features

### Game Modes

- **Custom Mode**: Upload your own PNG images for personalized bingo cards
  - Drag & drop or click to upload multiple PNG files
  - Assets are stored in IndexedDB for persistence
  - Automatic shuffling on restart for new layouts

- **Template Mode**: Automatically generated numbered boxes with random positioning
  - Customizable styling (fonts, colors, sizes)
  - Live preview of number layout
  - Random number generation with Fisher-Yates shuffle

### Core Features

- 🎲 **Smart Shuffling**: Every restart reshuffles assets/numbers for completely new layouts
- 🔄 **Animation Protection**: Content is hidden during shuffle animation to prevent spoilers
- 📱 **Responsive Design**: Automatically scales to fit any screen size
- 🎯 **Dual Input Methods**: 
  - Click boxes directly to reveal
  - Enter box ID (e.g., "A1") or number (e.g., "15") via input field
- 🔧 **Highly Configurable**: 
  - Adjustable grid size (3x3, 5x5, 7x7, 9x9, or 11x11)
  - Template mode styling customization
  - Asset management with individual or bulk removal
- 💾 **Persistent Storage**: 
  - IndexedDB for asset storage
  - LocalStorage for game configuration
  - Works completely offline
- 🎨 **Modern UI**: 
  - Beautiful 3D flip animations using Framer Motion
  - Smooth transitions and hover effects
  - Intuitive interface

### Asset Management

- Upload multiple PNG files via drag & drop
- Remove individual assets with hover delete button
- Clear all assets with confirmation dialog
- Automatic cleanup of Blob URLs and IndexedDB storage
- Assets persist across page refreshes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## How to Use

### Custom Mode

1. Navigate to the settings page (default route)
2. Select **"Custom Mode"**
3. Choose your **grid size** (must be odd: 3, 5, 7, 9, or 11)
4. **Upload PNG images**:
   - Drag & drop files onto the upload area, or click to select
   - Upload one less than total boxes (center is reserved for logo)
   - Remove individual assets by hovering and clicking the × button
   - Use "Clear All Assets" to remove all uploaded images
5. Click **"Start Game"**
6. **Play**:
   - Click boxes to reveal images
   - Or enter box ID (e.g., "A1", "B3") in the input field
7. Click **"🔄 Restart & Shuffle"** to reshuffle assets and start over

### Template Mode

1. Select **"Template Mode"** on the settings page
2. Choose your **grid size** (must be odd: 3, 5, 7, 9, or 11)
3. **Customize styling** (optional):
   - Font size and family
   - Text and background colors
   - Opened box colors
4. Click **"Generate Numbers"** to create random layout
   - Preview shows the number arrangement
   - Click "Regenerate Numbers" for a new arrangement
5. Click **"Start Game"**
6. **Play**:
   - Click boxes to reveal numbers
   - Or enter number (e.g., "15") in the input field
7. Click **"🔄 Restart & Shuffle"** to generate new random numbers

## Technology Stack

- **React 18** - UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **React Dropzone** - File upload component
- **IndexedDB** - Browser database for asset storage

## Project Structure

```
GTBigBingo/
├── public/                    # Static assets
│   ├── logo.svg              # Center logo (GT logo)
│   ├── poker-back.svg        # Card back image for flip animation
│   └── testingNumbers/       # Number images (1-30) for template mode
│
├── src/
│   ├── components/
│   │   ├── Bingo/            # Game page components
│   │   │   ├── BingoBox.tsx      # Individual box with 3D flip animation
│   │   │   ├── BingoGrid.tsx     # Responsive grid layout
│   │   │   ├── BingoPage.tsx     # Main game page with restart logic
│   │   │   └── NumberInput.tsx   # Input field for box ID/number entry
│   │   │
│   │   ├── Settings/         # Settings page components
│   │   │   ├── AssetUploader.tsx    # Drag & drop file upload with IndexedDB
│   │   │   ├── GridSizeSelector.tsx # Grid size selection (3-11, odd only)
│   │   │   ├── ModeSelector.tsx     # Game mode toggle (Custom/Template)
│   │   │   ├── SettingsPage.tsx     # Main settings page
│   │   │   └── TemplateGenerator.tsx # Template mode config & preview
│   │   │
│   │   └── shared/           # Reusable UI components
│   │       ├── Button.tsx    # Button component with variants
│   │       └── Input.tsx     # Input component
│   │
│   ├── store/                # Zustand state management
│   │   ├── configStore.ts   # Game configuration (persisted)
│   │   └── gameStore.ts     # Game state (boxes, shuffle state)
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts         # Shared types and interfaces
│   │
│   ├── utils/                # Utility functions
│   │   ├── assetStorage.ts  # IndexedDB storage for uploaded assets
│   │   ├── gridUtils.ts     # Grid initialization & Fisher-Yates shuffle
│   │   └── validation.ts   # Grid size validation helpers
│   │
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles & Tailwind imports
│
├── index.html               # HTML template
├── package.json             # Dependencies and npm scripts
├── tsconfig.json           # TypeScript compiler configuration
├── tsconfig.node.json      # TypeScript config for Node.js files
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # This file
```

## Architecture

### State Management

- **configStore**: Manages game configuration using Zustand with persistence
  - Grid size, game mode, assets, template settings
  - Persisted to localStorage via Zustand middleware
  - Handles IndexedDB operations for asset storage

- **gameStore**: Manages game state
  - Box states (opened/closed)
  - Shuffle state (prevents content visibility during shuffle)
  - Box opening logic

### Storage

- **IndexedDB**: Stores uploaded asset files persistently
  - Database: `GTBigBingoAssets`
  - Store: `assets`
  - Automatically cleaned when assets are removed

- **LocalStorage**: Stores game configuration
  - Persisted via Zustand middleware
  - Key: `bingo-config`

### Key Algorithms

- **Fisher-Yates Shuffle**: Used for randomizing asset positions and numbers
- **Grid Generation**: Creates grids with center logo and proper ID assignment (A1, A2, B1, etc.)

## Key Components

- **BingoBox**: 
  - 3D flip animation using Framer Motion
  - Prevents content visibility during shuffle (`isShuffling` state)
  - Handles click interactions and hover effects

- **BingoPage**: 
  - Main game interface
  - Restart/shuffle functionality with animation protection
  - Progress tracking (opened boxes count)

- **AssetUploader**: 
  - Drag & drop file upload
  - IndexedDB integration
  - Individual and bulk asset removal
  - Blob URL management

- **TemplateGenerator**: 
  - Live preview of number layout
  - Style customization controls
  - Number generation with preview

## Development

### Code Style

- TypeScript for type safety
- Functional components with React hooks
- Tailwind CSS for styling
- Component-based architecture

### Key Features Implementation

- **Shuffle Protection**: `isShuffling` state prevents content visibility during grid regeneration
- **Asset Persistence**: IndexedDB stores files, Blob URLs created for preview
- **Memory Management**: Blob URLs revoked when assets removed/cleared
- **Responsive Grid**: CSS Grid with aspect ratio and viewport-based sizing

## Browser Support

- Modern browsers with IndexedDB support
- Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT
