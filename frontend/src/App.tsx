import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ConfigExperimentPage from './pages/ConfigExperimentPage';
import LiveExperimentPage from './pages/LiveExperimentPage';
import ResultsPage from './pages/ResultsPage';
import TranscriptsPage from './pages/TranscriptsPage';
import AgentsPage from './pages/AgentsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/experiments" element={<DashboardPage />} />
          <Route path="/experiments/new" element={<ConfigExperimentPage />} />
          <Route path="/experiments/:id" element={<LiveExperimentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/transcripts" element={<TranscriptsPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
