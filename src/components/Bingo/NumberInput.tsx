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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'template' ? 'Enter number (e.g., 15)' : 'Enter box ID (e.g., A1)'}
          className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm
                     focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm
                     hover:bg-blue-600 transition-colors font-semibold"
        >
          Open
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </form>
  );
};

