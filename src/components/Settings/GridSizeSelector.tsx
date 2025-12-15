// components/Settings/GridSizeSelector.tsx
import { useConfigStore } from '../../store/configStore';
import { validateGridSize } from '../../utils/validation';
import { useState } from 'react';

export const GridSizeSelector = () => {
  const { gridSize, setGridSize } = useConfigStore();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: number) => {
    const validationError = validateGridSize(value);
    setError(validationError);
    
    if (!validationError) {
      setGridSize(value);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        Grid Size (must be odd)
      </label>
      <select
        value={gridSize}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value={3}>3x3 (9 boxes)</option>
        <option value={5}>5x5 (25 boxes)</option>
        <option value={7}>7x7 (49 boxes)</option>
        <option value={9}>9x9 (81 boxes)</option>
        <option value={11}>11x11 (121 boxes)</option>
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      <p className="text-gray-600 text-sm mt-2">
        Required assets: {gridSize * gridSize - 1} (center is logo)
      </p>
    </div>
  );
};

