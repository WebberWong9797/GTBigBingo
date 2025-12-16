// components/Settings/AssetUploader.tsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useConfigStore } from '../../store/configStore';
import { calculateRequiredAssets } from '../../utils/validation';

export const AssetUploader = () => {
  const { gridSize, assets, addAssets, removeAsset, clearAssets } = useConfigStore();
  const required = calculateRequiredAssets(gridSize);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pngFiles = acceptedFiles.filter(file => file.type === 'image/png');
    if (pngFiles.length < acceptedFiles.length) {
      alert('Only PNG files are accepted');
    }
    addAssets(pngFiles);
  }, [addAssets]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png']
    },
    multiple: true
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Upload Assets</h3>
      
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <input {...getInputProps()} />
        <div className="text-gray-600">
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <>
              <p className="mb-2">Drag & drop PNG images here, or click to select</p>
              <p className="text-sm">
                {assets.length} assets uploaded (need {required} for {gridSize}x{gridSize} grid)
              </p>
            </>
          )}
        </div>
      </div>

      {assets.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {assets.map((asset) => (
              <div key={asset.id} className="relative group">
                <img
                  src={asset.preview}
                  alt={asset.id}
                  className="w-full h-24 object-cover rounded border-2 border-gray-300"
                />
                <button
                  onClick={async () => await removeAsset(asset.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 
                            flex items-center justify-center opacity-0 group-hover:opacity-100 
                            transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={async () => {
              if (window.confirm(`Are you sure you want to clear all ${assets.length} assets?`)) {
                await clearAssets();
              }
            }}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-semibold
                       hover:bg-red-600 transition-colors"
          >
            🗑️ Clear All Assets
          </button>
        </>
      )}

      {assets.length > 0 && assets.length >= required && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 mt-3">
          <p className="text-green-700 text-sm font-semibold">
            ✓ {assets.length} images uploaded! Assets will be shuffled each time you restart the game.
          </p>
        </div>
      )}
      
      {assets.length < required && assets.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mt-3">
          <p className="text-yellow-700 text-sm">
            ⚠️ You have {assets.length} images (need {required}). 
            The remaining {required - assets.length} boxes will show the center logo.
          </p>
        </div>
      )}

      {assets.length === 0 && (
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3 mt-3">
          <p className="text-gray-700 text-sm">
            💡 No assets uploaded. All boxes will show the center logo (GT). You can still play!
          </p>
        </div>
      )}
    </div>
  );
};

