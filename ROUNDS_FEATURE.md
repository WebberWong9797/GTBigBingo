# 🎯 Multi-Round System

## Overview

The bingo platform now supports **multiple rounds** with intelligent asset distribution and state persistence!

---

## ✨ Key Features

### 1. Configure Number of Rounds
- Choose how many rounds you want to play (1-20)
- Each round gets its own set of cards
- Assets are distributed without duplication

### 2. No Asset Duplication
- Assets are distributed across rounds sequentially
- Each asset appears only once across all rounds
- If you run out of assets, remaining boxes show the logo

### 3. Round State Persistence
- Each round remembers which boxes you've opened
- Navigate between rounds without losing progress
- Complete rounds at your own pace

### 4. Round Navigation
- **Previous Button**: Go back to earlier rounds
- **Next Button**: Move forward to next rounds
- **Round Indicator**: Shows current round and completion status

---

## 🎮 How It Works

### Setup Process

**Step 1: Configure Rounds**
```
┌─────────────────────────┐
│ Number of Rounds: [3]   │
│ 3 rounds × 24 boxes     │
│ = 72 total assets needed│
└─────────────────────────┘
```

**Step 2: Upload Assets**
```
Upload 100 images
(More than enough for 3 rounds)
```

**Step 3: Distribute Assets**
```
Click "🎯 Distribute Assets to 3 Rounds"

Result:
- Round 1: Images 1-24
- Round 2: Images 25-48
- Round 3: Images 49-72
```

**Step 4: Start Game**
```
Begin with Round 1
```

---

## 📊 Asset Distribution Logic

### Case 1: Enough Assets for All Rounds
```
Grid: 5x5 (24 boxes per round)
Rounds: 3
Total needed: 72 assets
Uploaded: 100 images

Distribution:
Round 1: Images 1-24    (24 custom)
Round 2: Images 25-48   (24 custom)
Round 3: Images 49-72   (24 custom)

Remaining: 28 unused images
```

### Case 2: Partial Assets
```
Grid: 5x5 (24 boxes per round)
Rounds: 3
Total needed: 72 assets
Uploaded: 50 images

Distribution:
Round 1: Images 1-24    (24 custom)
Round 2: Images 25-48   (24 custom)
Round 3: Images 49-50   (2 custom + 22 logos)

No duplication!
```

### Case 3: Very Few Assets
```
Grid: 5x5 (24 boxes per round)
Rounds: 3
Total needed: 72 assets
Uploaded: 10 images

Distribution:
Round 1: Images 1-10    (10 custom + 14 logos)
Round 2: All logos      (0 custom + 24 logos)
Round 3: All logos      (0 custom + 24 logos)

Each asset used only once!
```

---

## 🎯 User Interface

### Settings Page

**Rounds Selector:**
```
┌─────────────────────────────────────┐
│ Number of Rounds: [3]               │
│ 3 rounds × 24 boxes = 72 total      │
│                                     │
│ ✓ You have enough assets (100)     │
│   for 3 rounds                      │
└─────────────────────────────────────┘
```

**Distribute Button:**
```
┌─────────────────────────────────────┐
│ [🎯 Distribute Assets to 3 Rounds]  │
└─────────────────────────────────────┘
```

**Distribution Confirmation:**
```
┌─────────────────────────────────────┐
│ ✓ Assets distributed to 3 rounds!   │
│                                     │
│ Round 1: 24 assets                  │
│ Round 2: 24 assets                  │
│ Round 3: 24 assets                  │
└─────────────────────────────────────┘
```

### Game Page

**Round Navigation:**
```
┌──────────────────────────────────────┐
│  [← Previous]  Round 2 / 3  [Next →] │
│                12 opened              │
└──────────────────────────────────────┘
```

**Navigation States:**
- **Round 1**: Previous button disabled
- **Round 3**: Next button disabled
- **Middle rounds**: Both buttons enabled

---

## 🔧 Technical Details

### Data Structure

```typescript
interface RoundState {
  roundNumber: number;
  boxes: BingoBox[];
  openedBoxIds: string[];
}

interface GameState {
  currentRound: number;
  totalRounds: number;
  roundStates: RoundState[];
}
```

### Asset Distribution Algorithm

```typescript
function distributeAssetsToRounds() {
  // Shuffle all assets
  const shuffled = [...assets].sort(() => Math.random() - 0.5);
  
  let assetIndex = 0;
  for (let round = 0; round < totalRounds; round++) {
    const roundAssets = [];
    
    for (let i = 0; i < requiredPerRound; i++) {
      if (assetIndex < shuffled.length) {
        roundAssets.push(shuffled[assetIndex]);
        assetIndex++; // No duplication!
      }
      // Otherwise, box will use logo
    }
    
    rounds.push(roundAssets);
  }
}
```

### State Persistence

```typescript
// When opening a box
openBox(id) {
  // Update current round's boxes
  // Save to round state
  roundStates[currentRound] = {
    boxes: updatedBoxes,
    openedBoxIds: [...ids]
  };
}

// When navigating rounds
goToRound(number) {
  // Load saved state for that round
  boxes = roundStates[number].boxes;
}
```

---

## 🎮 Usage Examples

### Example 1: Training Session
**Scenario**: 3 rounds of vocabulary practice

```
Setup:
- Upload 72 vocabulary word images
- Set 3 rounds (5x5 grid)
- Distribute assets

Gameplay:
- Round 1: First 24 words
- Round 2: Next 24 words
- Round 3: Last 24 words

Each round has different words!
```

### Example 2: Photo Collection
**Scenario**: Family photo bingo with 200 photos

```
Setup:
- Upload 200 family photos
- Set 8 rounds (5x5 grid)
- Distribute assets

Gameplay:
- 8 rounds × 24 photos = 192 photos used
- Each round has unique photos
- Navigate between rounds anytime
```

### Example 3: Limited Assets
**Scenario**: 5 company logos, 3 rounds

```
Setup:
- Upload 5 logos
- Set 3 rounds (3x3 grid)
- Distribute assets (8 boxes per round)

Result:
- Round 1: 5 logos + 3 GT logos
- Round 2: 8 GT logos
- Round 3: 8 GT logos

Still playable!
```

---

## 🎯 Benefits

### For Players
✅ **Variety**: Different cards each round  
✅ **Progress Tracking**: See completion per round  
✅ **Flexibility**: Play rounds in any order  
✅ **Persistence**: Never lose progress  

### For Organizers
✅ **No Duplication**: Fair distribution  
✅ **Scalable**: Support many rounds  
✅ **Graceful Fallback**: Works with any asset count  
✅ **Easy Setup**: One-click distribution  

### For Everyone
✅ **Clear UI**: Easy to understand  
✅ **Visual Feedback**: See round status  
✅ **Intuitive Navigation**: Simple buttons  
✅ **Professional**: Polished experience  

---

## 🎪 Round Navigation

### Navigation Controls

```
[← Previous]  Round 2 / 3  [Next →]
              12 opened
```

**Previous Button:**
- Goes to previous round
- Disabled on Round 1
- Loads saved state

**Next Button:**
- Goes to next round
- Disabled on last round
- Loads saved state

**Round Indicator:**
- Shows current/total rounds
- Shows completion status
- Updates in real-time

---

## 📝 Validation

| Scenario | Validation | Result |
|----------|-----------|--------|
| **0 assets, 1 round** | ✅ Valid | All logos |
| **24 assets, 1 round** | ✅ Valid | All custom |
| **50 assets, 2 rounds** | ✅ Valid | Round 1: 24 custom, Round 2: 24 custom, 2 unused |
| **10 assets, 3 rounds** | ✅ Valid | Round 1: 10 custom + 14 logos, Rounds 2-3: all logos |
| **Not distributed** | ❌ Invalid | Must click distribute button |

**Minimum Requirement**: Must distribute assets before starting

---

## 🚀 Workflow

### Complete Workflow

```
1. Settings Page
   ↓
2. Select Custom Mode
   ↓
3. Choose Grid Size (e.g., 5x5)
   ↓
4. Set Number of Rounds (e.g., 3)
   ↓
5. Upload Assets (e.g., 100 images)
   ↓
6. Click "Distribute Assets to 3 Rounds"
   ↓
7. See confirmation with distribution
   ↓
8. Click "Start Game"
   ↓
9. Play Round 1
   ↓
10. Click "Next →" for Round 2
   ↓
11. Play Round 2
   ↓
12. Click "Next →" for Round 3
   ↓
13. Play Round 3
   ↓
14. Click "← Previous" to review earlier rounds
```

---

## 🎊 Result

**A powerful multi-round system that supports any number of rounds with intelligent asset distribution and complete state persistence!**

Play multiple rounds without asset duplication, navigate freely between rounds, and never lose your progress! 🎯✨

