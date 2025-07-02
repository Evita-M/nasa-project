import { LoaderIcon } from 'lucide-react';

export const Loader = ({ title }: { title?: string }) => (
  <div className="h-full flex flex-col gap-4 items-center justify-center">
    <LoaderIcon className="animate-spin" size={44} aria-label="Loading" />
    {title && <p className="text-xl text-white">{title}</p>}
  </div>
);
