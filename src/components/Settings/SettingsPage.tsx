// components/Settings/SettingsPage.tsx
import { useNavigate } from 'react-router-dom';
import { useConfigStore } from '../../store/configStore';
import { ModeSelector } from './ModeSelector';
import { GridSizeSelector } from './GridSizeSelector';
import { AssetUploader } from './AssetUploader';
import { TemplateGenerator } from './TemplateGenerator';
import { Button } from '../shared/Button';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { mode, isConfigValid } = useConfigStore();

  const handleStartGame = () => {
    if (isConfigValid()) {
      navigate('/game');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Bingo Settings</h1>
          <p className="text-gray-600 mb-8">Configure your bingo game</p>

          <ModeSelector />
          <GridSizeSelector />

          {mode === 'custom' ? (
            <AssetUploader />
          ) : (
            <TemplateGenerator />
          )}

          <div className="mt-8 flex gap-4">
            <Button
              onClick={handleStartGame}
              disabled={!isConfigValid()}
              className="flex-1"
            >
              Start Game
            </Button>
          </div>

          {!isConfigValid() && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {mode === 'custom' 
                ? 'Please configure your game settings'
                : 'Please generate numbers before starting'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

