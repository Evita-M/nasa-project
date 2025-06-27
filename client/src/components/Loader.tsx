import { LoaderIcon } from 'lucide-react';

export const Loader = () => (
  <div className="h-full flex items-center justify-center">
    <LoaderIcon className="animate-spin" size={44} aria-label="Loading" />
  </div>
);
