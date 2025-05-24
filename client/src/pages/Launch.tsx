import { Launch } from '@/modules/Launch';
import { LaunchFormValues } from '@/forms/create-launch/schema';
import launchesStore from '@/store/launches-store';
import planetsStore from '@/store/planets-store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Heading } from '@/components/Heading';

export default function LaunchPage() {
  const { fetchPlanets, planets } = planetsStore();
  const { addLaunch } = launchesStore();

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

  return (
    <>
      <Heading
        title="Schedule Mission Launch"
        subtitle="Schedule a mission to launch on a specific date and time."
        className="mb-6"
      />
      <Launch planets={planets} onSubmit={handleSubmit} />
    </>
  );
}
