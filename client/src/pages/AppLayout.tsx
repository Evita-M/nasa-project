import { Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Launch from './Launch';
import History from './History';
import Upcoming from './Upcoming';
import { Card } from '../components/ui/Card';
import usePlanets from '../hooks/usePlanets';
const AppLayout = () => {
  const planets = usePlanets();
  const launches = [
    {
      flightNumber: 1,
      mission: 'Falcon 1',
      rocket: 'Falcon 1',
      launchDate: '2028-07-20',
      target: 'Kepler-186 f',
      upcoming: true,
      success: true,
    },
  ];
  const isPendingLaunch = false;
  const submitLaunch = () => {};
  const abortLaunch = () => {};

  return (
    <div className="flex flex-col min-h-screen text-cyan-100">
      <Header />
      <div className="flex-1 flex items-center justify-center py-8 px-2">
        <Card className="w-full max-w-[900px] min-h-[500px]">
          <Routes>
            <Route
              path="/"
              element={
                <Launch
                  planets={planets}
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch}
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
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch}
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
