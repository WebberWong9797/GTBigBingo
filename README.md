# GT Big Bingo

A local bingo platform with two flexible game modes: Custom (image-based) and Template (number-based).

## Features

- 🎮 **Two Game Modes**
  - **Custom Mode**: Upload your own PNG images for personalized bingo
  - **Template Mode**: Automatically generated numbered boxes with random positioning

- 🎲 **Random Generation**: Template mode shuffles numbers for unique layouts each time
- 📱 **Responsive Design**: Automatically scales to fit any screen
- 🎯 **Dual Input Methods**: Click boxes or enter ID/number to reveal
- 🔧 **Highly Configurable**: Adjustable grid size (3x3 to 11x11), styling, and assets
- 💾 **Local Storage**: No backend required, works completely offline
- 🎨 **Modern UI**: Beautiful animations and intuitive interface

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
4. Click "Start Game"
5. Click boxes or enter box ID (e.g., "A1") to reveal images

### Template Mode

1. Select "Template Mode" on the settings page
2. Choose your grid size (must be odd: 3, 5, 7, 9, or 11)
3. (Optional) Customize number styling (font, colors, etc.)
4. Click "Generate Numbers" to create random layout
5. Click "Regenerate" if you want a different arrangement
6. Click "Start Game"
7. Click boxes or enter numbers (e.g., "15") to reveal them

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
src/
├── components/
│   ├── Settings/          # Settings page components
│   ├── Bingo/             # Game page components
│   └── shared/            # Reusable components
├── store/                 # Zustand stores
├── utils/                 # Utility functions
├── types/                 # TypeScript types
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## License

MIT
