import { LaunchForm } from '@/forms/create-launch';
import { LaunchFormValues } from '@/forms/create-launch/schema';
import { Planet } from '@/types/planet';
import { FC } from 'react';

interface LaunchProps {
  planets: Planet[];
  onSubmit: (launch: LaunchFormValues) => Promise<void>;
  title: string;
  subtitle: string;
}

export const Launch: FC<LaunchProps> = ({
  planets,
  onSubmit,
  title,
  subtitle,
}) => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg text-white/70">{subtitle}</p>
      <div className="rounded-lg bg-slate-900/80 p-4 border-1 border-cyan-500">
        <p className="mb-2 text-sm font-medium">
          Only confirmed planets matching the following criteria are available
          for the earliest scheduled missions:
        </p>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>Planetary radius &lt; 1.6 times Earth's radius</li>
          <li>
            Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
            times Earth's value
          </li>
        </ul>
      </div>
    </div>
    <LaunchForm onSubmit={onSubmit} planets={planets} />
  </div>
);
