import { LaunchForm } from '@/forms/create-launch';
import { LaunchFormValues } from '@/forms/create-launch/schema';
import { Planet } from '@/types/planet';

interface LaunchProps {
  planets: Planet[];
  onSubmit: (launch: LaunchFormValues) => Promise<void>;
}

export const Launch = ({ planets, onSubmit }: LaunchProps) => (
  <div className="space-y-4">
    <div className="rounded-lg bg-slate-900/80 p-4 border-1 border-cyan-500">
      <p className="mb-2 font-medium">
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>
          Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
          times Earth's value
        </li>
      </ul>
    </div>
    <LaunchForm onSubmit={onSubmit} planets={planets} />
  </div>
);
