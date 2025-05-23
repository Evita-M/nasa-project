import { Upcoming } from '@/modules/Upcoming';
import launchesStore from '@/store/launches-store';
import { useCallback } from 'react';

export default function UpcomingPage() {
  const { launches, abortLaunch } = launchesStore();

  const handleAbortLaunch = useCallback(
    async (id: string) => {
      await abortLaunch(id);
    },
    [abortLaunch]
  );

  return (
    <Upcoming
      abortLaunch={handleAbortLaunch}
      launches={launches}
      title="Upcoming"
      subtitle="View the upcoming missions."
    />
  );
}
