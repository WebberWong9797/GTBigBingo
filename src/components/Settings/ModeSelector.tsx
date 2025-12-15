// components/Settings/ModeSelector.tsx
import { useConfigStore } from '../../store/configStore';

export const ModeSelector = () => {
  const { mode, setMode } = useConfigStore();
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3 text-gray-700">Game Mode</label>
      <div className="flex gap-4">
        <button
          onClick={() => setMode('custom')}
          className={`
            flex-1 py-4 px-6 rounded-lg border-2 transition-all
            ${mode === 'custom' 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'}
          `}
        >
          <div className="font-semibold text-lg">Custom Mode</div>
          <div className="text-sm mt-1">Upload your own images</div>
        </button>
        
        <button
          onClick={() => setMode('template')}
          className={`
            flex-1 py-4 px-6 rounded-lg border-2 transition-all
            ${mode === 'template' 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'}
          `}
        >
          <div className="font-semibold text-lg">Template Mode</div>
          <div className="text-sm mt-1">Use numbered boxes</div>
        </button>
      </div>
    </div>
  );
};

