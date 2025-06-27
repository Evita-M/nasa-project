export const StatusIndicator = ({ success = true }: { success?: boolean }) => (
  <span
    aria-label={success ? 'Success' : 'Failed'}
    className={`inline-block h-3 w-3 rounded-full ${success ? 'bg-green-500' : 'bg-red-500'}`}
  />
);
