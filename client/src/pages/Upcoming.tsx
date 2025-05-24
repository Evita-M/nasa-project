import { Heading } from '@/components/Heading';
import { Upcoming } from '@/modules/Upcoming';
import launchesStore from '@/store/launches-store';
import { useCallback } from 'react';

export default function UpcomingPage() {
  const { launches, abortLaunch } = launchesStore();
  const upcomingLaunches = launches.filter((launch) => launch.upcoming);

  const handleAbortLaunch = useCallback(
    async (id: string) => {
      await abortLaunch(id);
    },
    [abortLaunch]
  );

  return (
    <>
      <Heading
        title="Upcoming"
        subtitle="View the upcoming missions."
        className="mb-6"
      />
      <Upcoming abortLaunch={handleAbortLaunch} launches={upcomingLaunches} />
    </>
  );
}
