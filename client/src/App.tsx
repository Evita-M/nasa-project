import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LaunchPage from './pages/Launch';
import UpcomingPage from './pages/Upcoming';
import HistoryPage from './pages/History';
import { MainLayout } from './layout/MainLayout';
import './index.css';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
