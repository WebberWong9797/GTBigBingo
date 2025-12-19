// components/Settings/TemplateGenerator.tsx
import { useConfigStore } from '../../store/configStore';
import { useState } from 'react';

export const TemplateGenerator = () => {
  const { gridSize, templateNumbers, generateRandomNumbers, templateStyle, setTemplateStyle } = 
    useConfigStore();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateRandomNumbers();
      setIsGenerating(false);
    }, 300);
  };
  
  const totalBoxes = gridSize * gridSize;
  const hasCenter = gridSize % 2 !== 0;
  const centerIndex = hasCenter ? Math.floor(totalBoxes / 2) : -1;
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Template Configuration</h3>
        
        {/* Style Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Font Size</label>
            <input
              type="text"
              value={templateStyle.fontSize}
              onChange={(e) => setTemplateStyle({ fontSize: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="2rem"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Font Family</label>
            <select
              value={templateStyle.fontFamily}
              onChange={(e) => setTemplateStyle({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Text Color</label>
            <input
              type="color"
              value={templateStyle.color}
              onChange={(e) => setTemplateStyle({ color: e.target.value })}
              className="w-full h-10 border-2 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Background Color</label>
            <input
              type="color"
              value={templateStyle.backgroundColor}
              onChange={(e) => setTemplateStyle({ backgroundColor: e.target.value })}
              className="w-full h-10 border-2 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Opened Text Color</label>
            <input
              type="color"
              value={templateStyle.openedColor || '#ffffff'}
              onChange={(e) => setTemplateStyle({ openedColor: e.target.value })}
              className="w-full h-10 border-2 border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Opened Background</label>
            <input
              type="color"
              value={templateStyle.openedBackgroundColor || '#3b82f6'}
              onChange={(e) => setTemplateStyle({ openedBackgroundColor: e.target.value })}
              className="w-full h-10 border-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>
        
        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold
                     hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {isGenerating ? 'Generating...' : templateNumbers.length > 0 ? 'Regenerate Numbers' : 'Generate Numbers'}
        </button>
      </div>
      
      {/* Preview Grid */}
      {templateNumbers.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-3">Preview</h4>
          <div 
            className="grid gap-1 border-2 border-gray-300 rounded-lg p-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              aspectRatio: '1/1',
              maxWidth: '400px'
            }}
          >
            {Array.from({ length: totalBoxes }).map((_, index) => {
              const isCenter = hasCenter && index === centerIndex;
              const numberIndex = hasCenter && index < centerIndex ? index : (hasCenter ? index - 1 : index);
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-center rounded border border-gray-300"
                  style={{
                    backgroundColor: isCenter ? '#fef3c7' : templateStyle.backgroundColor,
                    color: templateStyle.color,
                    fontSize: '0.8rem',
                    fontFamily: templateStyle.fontFamily,
                    minHeight: '40px'
                  }}
                >
                  {isCenter ? '★' : templateNumbers[numberIndex]}
                </div>
              );
            })}
          </div>
          {hasCenter && (
            <p className="text-sm text-gray-600 mt-2">
              ★ = Center logo position
            </p>
          )}
        </div>
      )}
    </div>
  );
};

