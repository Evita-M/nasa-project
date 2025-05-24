import { Heading } from '@/components/Heading';
import { History } from '@/modules/History';
import launchesStore from '@/store/launches-store';

export default function HistoryPage() {
  const { launches } = launchesStore();

  return (
    <>
      <Heading
        title="History"
        subtitle="View the history of all missions."
        className="mb-6"
      />
      <History launches={launches} />
    </>
  );
}
