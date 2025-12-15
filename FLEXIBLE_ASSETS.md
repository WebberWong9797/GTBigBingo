# 🎲 Flexible Asset Management

## Overview

The Custom Mode now supports **flexible asset management** - you can upload any number of images, and the system will intelligently handle them!

---

## ✨ New Features

### 1. Upload More Assets Than Needed
**Scenario**: You have 50 images but only need 24 for a 5x5 grid

**Solution**: 
- Upload all 50 images
- Click "🎲 Shuffle & Select Random Cards"
- System randomly selects 24 images from your 50
- Each game can have different cards!

**Benefits**:
- ✅ Variety in gameplay
- ✅ Replayability
- ✅ No need to manually select
- ✅ Random selection each time

### 2. Upload Fewer Assets Than Needed
**Scenario**: You have 10 images but need 24 for a 5x5 grid

**Solution**:
- Upload your 10 images
- System uses all 10 images
- Remaining 14 boxes show the center logo (GT)
- Game still works perfectly!

**Benefits**:
- ✅ No minimum requirement
- ✅ Logo fills empty spaces
- ✅ Still playable
- ✅ Flexible for any situation

---

## 🎮 How It Works

### Case 1: Exact Number of Assets
```
Grid: 5x5 (needs 24 assets)
Uploaded: 24 images
Result: All 24 images used directly
```

### Case 2: More Assets Than Needed
```
Grid: 5x5 (needs 24 assets)
Uploaded: 50 images
Action: Click "Shuffle" button
Result: 24 randomly selected from 50

Game 1: [Images: 3, 7, 12, 15, 18, 22, ...]
Game 2: [Images: 1, 9, 14, 20, 25, 33, ...] ← Different!
Game 3: [Images: 5, 11, 17, 23, 28, 40, ...] ← Different!
```

### Case 3: Fewer Assets Than Needed
```
Grid: 5x5 (needs 24 assets)
Uploaded: 10 images
Result: 
  - Boxes 1-10: Your uploaded images
  - Boxes 11-24: Center logo (GT)
  - Center: Logo (always)
```

---

## 🎯 User Interface

### Upload Section

**Status Messages:**

1. **No assets uploaded:**
```
┌─────────────────────────────────┐
│ Drag & drop PNG images here     │
│ 0 assets uploaded (need 24)     │
└─────────────────────────────────┘
```

2. **Fewer assets than needed:**
```
┌─────────────────────────────────┐
│ 10 assets uploaded (need 24)    │
└─────────────────────────────────┘

⚠️ You have 10 images (need 24).
The remaining 14 boxes will show the center logo.
```

3. **More assets than needed:**
```
┌─────────────────────────────────┐
│ 50 assets uploaded (need 24)    │
└─────────────────────────────────┘

✨ You have 50 images (need 24).
Click "Shuffle" to randomly select 24 cards!

[🎲 Shuffle & Select 24 Random Cards]
```

4. **After shuffling:**
```
✓ 24 cards selected for the game! Ready to start.
```

---

## 🔧 Technical Details

### Random Selection Algorithm

```typescript
// Fisher-Yates shuffle
const shuffled = [...assets].sort(() => Math.random() - 0.5);
const selected = shuffled.slice(0, required);
```

### Grid Initialization Logic

```typescript
if (selectedAssets.length > 0) {
  // Use shuffled selection
  useAssets = selectedAssets;
} else {
  // Use all uploaded assets
  useAssets = assets;
}

for each box:
  if (isCenter) {
    image = logo;
  } else if (hasAsset) {
    image = useAssets[index];
  } else {
    image = logo; // Fill with logo
  }
```

### State Management

```typescript
interface ConfigStore {
  assets: Array<...>;           // All uploaded assets
  selectedAssets: Array<...>;   // Randomly selected subset
  shuffleAssets: () => void;    // Shuffle function
}
```

---

## 📊 Examples

### Example 1: Photo Collection
**Scenario**: You have 100 family photos, want 5x5 grid (24 boxes)

**Steps**:
1. Upload all 100 photos
2. Click "Shuffle & Select 24 Random Cards"
3. Start game with 24 random photos
4. Play again → Click "Shuffle" → Get different 24 photos!

**Result**: Endless variety!

### Example 2: Limited Assets
**Scenario**: You only have 5 company logos, want 5x5 grid (24 boxes)

**Steps**:
1. Upload 5 logos
2. Start game directly (no shuffle needed)
3. First 5 boxes show your logos
4. Remaining 19 boxes show GT logo

**Result**: Still playable!

### Example 3: Educational Game
**Scenario**: 30 vocabulary words, 3x3 grid (8 boxes)

**Steps**:
1. Upload 30 word images
2. Click "Shuffle & Select 8 Random Cards"
3. Each game has different words
4. Students get variety in practice

**Result**: Better learning!

---

## 🎨 Visual Flow

### Upload More Assets
```
[Upload 50 images]
        ↓
[See all 50 thumbnails]
        ↓
[Click "Shuffle" button]
        ↓
[System selects 24 randomly]
        ↓
[Green confirmation message]
        ↓
[Start Game]
        ↓
[Play with 24 random cards]
```

### Upload Fewer Assets
```
[Upload 10 images]
        ↓
[See all 10 thumbnails]
        ↓
[Yellow warning: 14 will be logos]
        ↓
[Start Game directly]
        ↓
[10 custom + 14 logo boxes]
```

---

## 🎯 Benefits

### For Users with Many Assets
✅ **Variety**: Different cards each game  
✅ **Replayability**: Never the same twice  
✅ **Convenience**: No manual selection needed  
✅ **Flexibility**: Upload entire collection once  

### For Users with Few Assets
✅ **No Barriers**: Start with any number  
✅ **Graceful Fallback**: Logo fills gaps  
✅ **Still Playable**: Game works perfectly  
✅ **No Errors**: System handles it smoothly  

### For Everyone
✅ **Intuitive**: Clear messages guide you  
✅ **Visual Feedback**: See what's happening  
✅ **Flexible**: Works for any scenario  
✅ **Professional**: Polished experience  

---

## 🚀 Usage Tips

### Tip 1: Build a Library
Upload a large collection of images once, then shuffle for variety in each game!

### Tip 2: Theme Mixing
Upload images from different themes, shuffle to get random mix!

### Tip 3: Quick Games
Have just a few images? No problem - start immediately!

### Tip 4: Reshuffle Anytime
Not happy with the selection? Go back to settings and shuffle again!

---

## 📝 Validation Rules

| Scenario | Assets | Required | Validation | Action |
|----------|--------|----------|------------|--------|
| **Exact** | 24 | 24 | ✅ Valid | Use all 24 |
| **More** | 50 | 24 | ✅ Valid | Shuffle to select 24 |
| **Fewer** | 10 | 24 | ✅ Valid | Use 10 + 14 logos |
| **None** | 0 | 24 | ❌ Invalid | Must upload at least 1 |

**Minimum Requirement**: At least 1 asset must be uploaded

---

## 🎊 Result

**A flexible, user-friendly asset management system that works for everyone!**

Whether you have 1 image or 1000 images, the system handles it intelligently! 🎲✨

