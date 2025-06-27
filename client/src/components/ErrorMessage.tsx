import { Info } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p
    className="mt-1 flex items-center gap-2 text-sm"
    style={{ color: 'var(--error)' }}
  >
    <Info className="h-4 w-4 -mt-0.5" color="var(--error)" />
    {message}
  </p>
);
