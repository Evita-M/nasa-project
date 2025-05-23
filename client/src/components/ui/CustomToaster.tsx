import { CheckCircle, Info, XCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      containerStyle={{
        top: '100px',
        right: '0',
        left: '0',
        position: 'absolute',
      }}
      toastOptions={{
        duration: Infinity,
        className: 'rounded-xl flex max-w-[400px] px-6 py-6',
        style: {
          color: '#ffffff',
          backdropFilter: 'blur(12.5px)',
          background: 'var(--glass-background)',
          border: '1px solid var(--glass-border)',
          pointerEvents: 'auto',
        },
        success: {
          style: {
            border: '1px solid lightgreen',
          },
          icon: <CheckCircle className="h-4 w-4" color="lightgreen" />,
        },
        error: {
          style: {
            border: '1px solid lightred',
          },
          icon: <XCircle className="h-4 w-4" color="lightred" />,
        },
        icon: <Info className="h-4 w-4" />,
      }}
    />
  );
};
