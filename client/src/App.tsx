import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LaunchPage from './pages/Launch';
import UpcomingPage from './pages/Upcoming';
import HistoryPage from './pages/History';
import { MainLayout } from './layout/MainLayout';
import './index.css';
import { Suspense } from 'react';
import { Loader } from './components/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import NotFoundPage from './pages/NotFound';
import { routes } from './lib/routes';

const App = () => {
  const {home, launch, upcoming, history, notFound}= routes

  return (
      <ErrorBoundary fallback={<p>Error loading data...</p>}>
        <Suspense fallback={<Loader title="Loading..." />}>
         <Router>
          <MainLayout>
            <Routes>
              <Route path={home} element={<LaunchPage />} />
              <Route path={launch} element={<LaunchPage />} />
              <Route path={upcoming} element={<UpcomingPage />} />
              <Route path={history} element={<HistoryPage />} />
              <Route path={notFound} element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to={notFound} replace />} />
            </Routes>
          </MainLayout>
          </Router>
        </Suspense>
      </ErrorBoundary>
  );
};

export default App;
