import { Heading } from '@/components/Heading';
import { Upcoming } from '@/modules/Upcoming';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';
import { useCallback, useEffect } from 'react';

export default function UpcomingPage() {
  const { launches, abortLaunch, fetchLaunches } = launchesStore();

  useEffect(() => {
    fetchLaunches(1, 10, LaunchStatus.UPCOMING);
  }, [fetchLaunches]);

  const handleAbortLaunch = useCallback(
    async (id: string) => {
      await abortLaunch(id);
      // Refetch after abort to update the list
      await fetchLaunches(1, 10, LaunchStatus.UPCOMING);
    },
    [abortLaunch, fetchLaunches]
  );

  return (
    <>
      <Heading
        title="Upcoming"
        subtitle="View the upcoming missions."
        className="mb-6"
      />
      <Upcoming abortLaunch={handleAbortLaunch} launches={launches} />
    </>
  );
}
