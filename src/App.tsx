// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsPage } from './components/Settings/SettingsPage';
import { BingoPage } from './components/Bingo/BingoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/game" element={<BingoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

