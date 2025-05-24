import { RocketIcon } from 'lucide-react';
import { FC } from 'react';

interface EmptyStateProps {
  text: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-full">
      <RocketIcon className="h-10 w-10" color="var(--primary)" />
      <p>{text}</p>
    </div>
  );
};
