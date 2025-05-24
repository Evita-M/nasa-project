import { Info } from 'lucide-react';
import { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <p
    className="mt-1 flex items-center gap-2 text-sm"
    style={{ color: 'var(--error)' }}
  >
    <Info className="h-4 w-4 -mt-0.5" color="var(--error)" />
    {message}
  </p>
);
