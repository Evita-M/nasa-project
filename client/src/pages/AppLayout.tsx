import { Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Launch from './Launch';
import History from './History';
import Upcoming from './Upcoming';
import { Card } from '../components/ui/Card';
import launchesStore from '@/store/launches-store';
import { useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import planetsStore from '@/store/planets-store';

const AppLayout = () => {
  const { planets } = planetsStore();
  const { launches, isLoading, error, addLaunch, abortLaunch } =
    launchesStore();

  const handleSubmitLaunch = useCallback(
    async (values: {
      launchDate: Date;
      mission: string;
      rocket: string;
      destination: string;
    }) => {
      await addLaunch(values);
    },
    [addLaunch]
  );

  return (
    <div className="flex flex-col min-h-screen text-cyan-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Header />
      <div className="flex-1 flex items-center justify-center py-8 px-2">
        <Card className="w-full max-w-[900px] min-h-[500px]">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <Routes>
            <Route
              path="/"
              element={
                <Launch
                  planets={planets}
                  submitLaunch={handleSubmitLaunch}
                  title="Schedule Mission Launch"
                  subtitle="Schedule a mission to launch on a specific date and time."
                />
              }
            />
            <Route
              path="/launch"
              element={
                <Launch
                  planets={planets}
                  submitLaunch={handleSubmitLaunch}
                  title="Schedule Mission Launch"
                  subtitle="Schedule a mission to launch on a specific date and time."
                />
              }
            />
            <Route
              path="/upcoming"
              element={
                <Upcoming
                  launches={launches}
                  abortLaunch={abortLaunch}
                  title="Upcoming Missions"
                  subtitle="Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets."
                />
              }
            />
            <Route
              path="/history"
              element={
                <History
                  launches={launches}
                  title="Mission History"
                  subtitle="A list of all missions that have been launched."
                />
              }
            />
          </Routes>
        </Card>
      </div>
      <Footer text="This is not an official site and is not affiliated with NASA or SpaceX in any way. For educational purposes only." />
    </div>
  );
};

export default AppLayout;
