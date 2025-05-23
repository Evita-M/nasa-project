import { Launch } from '@/modules/Launch';
import launchesStore from '@/store/launches-store';
import planetsStore from '@/store/planets-store';
import { useCallback, useEffect } from 'react';

export default function LaunchPage() {
  const { fetchPlanets, planets } = planetsStore();
  const { addLaunch } = launchesStore();

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

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
    <Launch
      planets={planets}
      submitLaunch={handleSubmitLaunch}
      title="Schedule Mission Launch"
      subtitle="Schedule a mission to launch on a specific date and time."
    />
  );
}
