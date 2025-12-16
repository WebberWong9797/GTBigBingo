# GT Big Bingo

A local bingo platform with two flexible game modes: Custom (image-based) and Template (number-based).

## Features

- 🎮 **Two Game Modes**
  - **Custom Mode**: Upload your own PNG images for personalized bingo
  - **Template Mode**: Automatically generated numbered boxes with random positioning

- 🎲 **Shuffle on Restart**: Every restart reshuffles assets/numbers for a completely new layout
- 🔄 **Smart Restart**: Restart button reshuffles the grid while hiding content during animation
- 📱 **Responsive Design**: Automatically scales to fit any screen
- 🎯 **Dual Input Methods**: Click boxes or enter ID/number to reveal
- 🔧 **Highly Configurable**: Adjustable grid size (3x3 to 11x11), styling, and assets
- 💾 **Local Storage**: No backend required, works completely offline
- 🎨 **Modern UI**: Beautiful flip animations and intuitive interface
- 🗑️ **Asset Management**: Easy upload, remove, and clear all assets functionality

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
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

1. Select "Custom Mode" on the settings page
2. Choose your grid size (must be odd: 3, 5, 7, 9, or 11)
3. Upload PNG images (one less than total boxes, as center is reserved for logo)
   - Drag & drop or click to select multiple PNG files
   - Remove individual assets by hovering and clicking the × button
   - Use "Clear All Assets" to remove all uploaded images at once
4. Click "Start Game"
5. Click boxes or enter box ID (e.g., "A1") to reveal images
6. Click "🔄 Restart & Shuffle" to reshuffle assets and start over

### Template Mode

1. Select "Template Mode" on the settings page
2. Choose your grid size (must be odd: 3, 5, 7, 9, or 11)
3. (Optional) Customize number styling (font, colors, etc.)
4. Click "Generate Numbers" to create random layout
5. Click "Start Game"
6. Click boxes or enter numbers (e.g., "15") to reveal them
7. Click "🔄 Restart & Shuffle" to generate new random numbers and reshuffle

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation
- **React Dropzone** - File uploads

## Project Structure

```
GTBigBingo/
├── public/                    # Static assets
│   ├── logo.svg              # Center logo (GT logo)
│   ├── poker-back.svg        # Card back image
│   └── numbers/              # Number images (1-30) for template mode
│
├── src/
│   ├── components/
│   │   ├── Bingo/            # Game page components
│   │   │   ├── BingoBox.tsx      # Individual bingo box with flip animation
│   │   │   ├── BingoGrid.tsx     # Grid layout component
│   │   │   ├── BingoPage.tsx     # Main game page
│   │   │   └── NumberInput.tsx   # Number input component
│   │   ├── Settings/        # Settings page components
│   │   │   ├── AssetUploader.tsx    # File upload component
│   │   │   ├── GridSizeSelector.tsx # Grid size selection
│   │   │   ├── ModeSelector.tsx    # Game mode selector
│   │   │   ├── SettingsPage.tsx    # Main settings page
│   │   │   └── TemplateGenerator.tsx # Template mode number generator
│   │   └── shared/          # Reusable components
│   │       ├── Button.tsx   # Button component
│   │       └── Input.tsx     # Input component
│   │
│   ├── store/                # Zustand state management
│   │   ├── configStore.ts    # Game configuration store
│   │   └── gameStore.ts      # Game state store
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types and interfaces
│   │
│   ├── utils/                # Utility functions
│   │   ├── gridUtils.ts      # Grid initialization and shuffling
│   │   └── validation.ts     # Validation helpers
│   │
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

### Key Components

- **BingoBox**: Handles flip animations and prevents content visibility during shuffle
- **BingoPage**: Main game interface with restart/shuffle functionality
- **AssetUploader**: Drag-and-drop file upload with clear all functionality
- **configStore**: Manages game configuration (mode, grid size, assets, template settings)
- **gameStore**: Manages game state (boxes, shuffle state, box opening logic)
- **gridUtils**: Grid initialization with Fisher-Yates shuffle algorithm

## License

MIT
