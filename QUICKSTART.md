# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit: **http://localhost:5173/**

---

## 🎮 Try Both Modes

### Template Mode (Fastest Way to Test)
1. Select "Template Mode"
2. Keep default 5x5 grid
3. Click "Generate Numbers" 
4. Click "Start Game"
5. Click boxes or type numbers (e.g., "15") to reveal

### Custom Mode
1. Select "Custom Mode"
2. Choose grid size (e.g., 3x3 requires 8 images)
3. Drag & drop PNG images or click to upload
4. Click "Start Game"
5. Click boxes or type IDs (e.g., "A1") to reveal

---

## 📦 Build for Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` folder.

---

## 🎨 Customization Tips

### Template Mode Styling
- Change font size (e.g., "3rem", "24px")
- Pick colors with color pickers
- Try different fonts (Arial, Courier, Georgia, Times)
- Customize opened vs closed states

### Grid Sizes
- **3x3**: Small, quick games (8 boxes)
- **5x5**: Standard bingo (24 boxes) ⭐ Recommended
- **7x7**: Medium challenge (48 boxes)
- **9x9**: Large games (80 boxes)
- **11x11**: Maximum size (120 boxes)

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is taken:
```bash
npm run dev -- --port 3000
```

### Clear Browser Storage
If you encounter issues, clear the browser's local storage:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Delete "bingo-config"
4. Refresh page

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Pro Tips

1. **Template Mode** is perfect for quick testing without preparing images
2. **Regenerate** as many times as you want for different number layouts
3. The **center box** always shows the logo (GT)
4. **Opened count** tracks your progress
5. Use **keyboard** to type IDs/numbers quickly
6. **Local storage** saves your configuration between sessions

---

## 🎯 What's Next?

- Try different grid sizes
- Upload your own images for Custom mode
- Experiment with Template styling
- Share your configurations with friends!

Enjoy your bingo game! 🎉

