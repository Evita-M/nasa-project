import { Launch } from '@/modules/Launch';
import { LaunchFormValues } from '@/forms/create-launch/schema';
import launchesStore, {
  selectUpcomingLaunchesCount,
} from '@/store/launches-store';
import planetsStore from '@/store/planets-store';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Heading } from '@/components/Heading';
import { generateLaunchSubtitle } from '@/lib/utils';

export default function LaunchPage() {
  const { fetchPlanets, planets } = planetsStore();
  const { addLaunch } = launchesStore();
  const upcomingCount = launchesStore(selectUpcomingLaunchesCount);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const handleSubmit = async ({
    launchDate,
    missionName,
    rocketName,
    planetName,
  }: LaunchFormValues) => {
    try {
      await addLaunch({
        launchDate: new Date(launchDate),
        missionName,
        rocketName,
        planetName,
      });
      toast.success('Mission scheduled successfully!');
    } catch (error) {
      toast.error('Failed to schedule mission. Please try again.');
    }
  };

  const subtitle = useMemo(() => {
    return generateLaunchSubtitle(upcomingCount);
  }, [upcomingCount]);

  return (
    <>
      <Heading
        title="Schedule Mission Launch"
        subtitle={subtitle}
        className="mb-6"
      />
      <Launch
        planets={Array.isArray(planets) ? planets : []}
        onSubmit={handleSubmit}
      />
    </>
  );
}
