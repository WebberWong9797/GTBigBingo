// components/Bingo/BingoBox.tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useConfigStore } from '../../store/configStore';
import { BingoBox as BingoBoxType } from '../../types';

interface Props {
  box: BingoBoxType;
}

export const BingoBox = ({ box }: Props) => {
  const openBox = useGameStore((state) => state.openBox);
  const isShuffling = useGameStore((state) => state.isShuffling);
  const templateStyle = useConfigStore((state) => state.templateStyle);
  
  const handleClick = () => {
    if (!box.isOpened && !box.isCenter && !isShuffling) {
      openBox(box.id);
    }
  };
  
  // During shuffle, always show back side regardless of opened state
  const shouldShowBack = isShuffling || !box.isOpened;
  
  // Render custom mode box
  if (box.mode === 'custom') {
    return (
      <div
        className={`
          relative rounded-lg overflow-visible cursor-pointer w-full h-full
          ${box.isCenter ? 'border-2 border-yellow-400' : ''}
        `}
        onClick={handleClick}
        style={{
          perspective: '1000px'
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateY: shouldShowBack ? 0 : 180
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          whileHover={shouldShowBack && !box.isCenter && !isShuffling ? { scale: 1.05 } : {}}
          whileTap={shouldShowBack && !box.isCenter && !isShuffling ? { scale: 0.95 } : {}}
        >
          {/* Card Back */}
          <div
            className="absolute w-full h-full rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <img
              src="/poker-back.svg"
              alt="Card back"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Card Front */}
          <div
            className="absolute w-full h-full rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              opacity: isShuffling ? 0 : 1
            }}
          >
            <img
              src={box.imageData}
              alt={box.id}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Render template mode box
  return (
    <div
      className={`
        relative rounded-lg overflow-visible cursor-pointer w-full h-full
        ${box.isCenter ? 'border-2 border-yellow-400' : ''}
      `}
      onClick={handleClick}
      style={{
        perspective: '1000px'
      }}
    >
      {box.isCenter ? (
        <img
          src={box.imageData}
          alt="Logo"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateY: shouldShowBack ? 0 : 180
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          whileHover={shouldShowBack && !isShuffling ? { scale: 1.05 } : {}}
          whileTap={shouldShowBack && !isShuffling ? { scale: 0.95 } : {}}
        >
          {/* Card Back */}
          <div
            className="absolute w-full h-full rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <img
              src="/poker-back.svg"
              alt="Card back"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Card Front */}
          <div
            className="absolute w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: templateStyle.openedBackgroundColor,
              opacity: isShuffling ? 0 : 1
            }}
          >
            <span
              style={{
                fontSize: '3rem',
                fontFamily: templateStyle.fontFamily,
                color: templateStyle.openedColor,
                fontWeight: 'bold'
              }}
            >
              {box.displayNumber}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

