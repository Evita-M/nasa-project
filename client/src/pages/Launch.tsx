import { Launch } from '@/modules/Launch';
import { LaunchFormValues } from '@/forms/create-launch/schema';
import launchesStore from '@/store/launches-store';
import planetsStore from '@/store/planets-store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LaunchPage() {
  const { fetchPlanets, planets } = planetsStore();
  const { addLaunch } = launchesStore();

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const handleSubmit = async (values: LaunchFormValues) => {
    try {
      await addLaunch({
        launchDate: new Date(values.launchDate),
        missionName: values.missionName,
        rocketName: values.rocketName,
        planetName: values.planetName,
      });
      toast.success('Mission scheduled successfully!');
    } catch (error) {
      toast.error('Failed to schedule mission. Please try again.');
    }
  };

  return (
    <Launch
      planets={planets}
      onSubmit={handleSubmit}
      title="Schedule Mission Launch"
      subtitle="Schedule a mission to launch on a specific date and time."
    />
  );
}
