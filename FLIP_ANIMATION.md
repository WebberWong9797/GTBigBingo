# 🃏 3D Card Flip Animation

## Overview

The bingo boxes now feature a realistic **3D card flip animation** when opened, just like flipping a real poker card!

---

## ✨ Animation Features

### 3D Flip Effect
- **True 3D rotation** around the Y-axis (horizontal flip)
- **Duration**: 0.6 seconds
- **Easing**: Smooth ease-in-out curve
- **Perspective**: 1000px for realistic depth

### Card Structure
Each box has two sides:
1. **Back Side**: Poker card design (visible when closed)
2. **Front Side**: Content (image or number, visible when opened)

### Technical Implementation

```
Card Container (perspective: 1000px)
    ↓
Rotating Element (transform-style: preserve-3d)
    ↓
    ├── Back Face (rotateY: 0deg)
    │   └── Poker card image
    │
    └── Front Face (rotateY: 180deg)
        └── Content (image or number)
```

---

## 🎬 Animation Sequence

### When You Click a Card:

```
1. Click Event
   ↓
2. Card starts rotating (rotateY: 0° → 180°)
   ↓
3. Back face becomes invisible (backface-visibility: hidden)
   ↓
4. Front face appears from behind
   ↓
5. Animation completes (0.6 seconds)
   ↓
6. Content fully revealed
```

### Visual Timeline:

```
0.0s: [Poker Back] ←─────────────────┐
                                      │
0.2s: [Rotating...] ←─── Side view   │ 180° rotation
                                      │
0.4s: [Rotating...] ←─── Side view   │
                                      │
0.6s: [Content Front] ←───────────────┘
```

---

## 🎨 Visual Details

### Poker Card Back
- Dark navy background with gold accents
- Decorative patterns and ornaments
- Professional casino aesthetic
- Fully visible when closed

### Content Front (Custom Mode)
- Your uploaded image
- Full coverage of card face
- Maintains image aspect ratio

### Content Front (Template Mode)
- Large number (3rem font)
- Custom background color
- Custom text color
- Centered display

---

## 🎯 Interaction States

### Closed State
- Shows poker card back
- Hover: Slight scale up (1.05x)
- Click: Scale down (0.95x) then flip
- Cursor: Pointer

### Opening Animation
- 3D rotation over 0.6 seconds
- Smooth easing curve
- Back face fades out
- Front face fades in

### Opened State
- Shows content (image or number)
- No hover effects
- No click response
- Cursor: Default

### Center Box (Logo)
- Always open
- No animation
- No interaction
- Border highlight (yellow)

---

## 🔧 Technical Details

### CSS Properties Used

```css
/* Container */
perspective: 1000px;              /* 3D depth */
overflow: visible;                /* Allow 3D rotation */

/* Rotating element */
transform-style: preserve-3d;     /* Enable 3D transforms */
rotateY: 0deg → 180deg;          /* Flip rotation */

/* Card faces */
backface-visibility: hidden;      /* Hide back when rotated */
position: absolute;               /* Stack faces */
transform: rotateY(180deg);       /* Front face pre-rotated */
```

### Framer Motion Animation

```typescript
animate={{
  rotateY: box.isOpened ? 180 : 0
}}
transition={{
  duration: 0.6,
  ease: 'easeInOut'
}}
```

---

## 🎮 User Experience

### What Players See

1. **Before Click**: Mysterious poker card back
2. **During Flip**: Smooth 3D rotation (0.6s)
3. **After Flip**: Revealed content

### Why It's Great

✅ **Realistic**: Mimics real card flipping  
✅ **Satisfying**: Smooth, polished animation  
✅ **Clear**: Easy to understand what's happening  
✅ **Engaging**: Makes reveals more exciting  
✅ **Professional**: Casino-quality effect  

---

## 🎪 Animation Timing

```
User clicks card
    ↓
0.0s - Animation starts
    ↓
0.1s - Card at 30° angle
    ↓
0.2s - Card at 60° angle (side view)
    ↓
0.3s - Card at 90° angle (edge view)
    ↓
0.4s - Card at 120° angle (back side view)
    ↓
0.5s - Card at 150° angle
    ↓
0.6s - Card at 180° angle (front fully visible)
    ↓
Animation complete!
```

---

## 🌟 Special Features

### Hover Effects
- Cards scale up slightly (1.05x) on hover
- Only works on closed cards
- Smooth transition (0.2s)

### Click Feedback
- Cards scale down (0.95x) on click
- Immediate response before flip
- Tactile feel

### Perspective
- 1000px perspective creates realistic depth
- Cards appear to flip in 3D space
- More dramatic than 2D rotation

### Backface Culling
- `backface-visibility: hidden` prevents visual glitches
- Clean flip without seeing through cards
- Professional appearance

---

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

Uses standard CSS 3D transforms and Framer Motion for smooth animation.

---

## 🎉 Result

**A polished, professional card flip animation that makes the bingo game feel like a real casino experience!**

Refresh your browser to see the cards flip! 🃏✨

