import { CheckCircle, Info, XCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => (
  <Toaster
    position="top-right"
    containerStyle={{
      right: '8px',
      position: 'absolute',
    }}
    toastOptions={{
      duration: 3000,
      className: 'rounded-xl flex ',

      style: {
        color: '#ffffff',
        backdropFilter: 'blur(12.5px)',
        background: 'var(--glass-background)',
        border: '1px solid var(--glass-border)',
        pointerEvents: 'auto',
        padding: '8px 16px',
      },
      success: {
        style: {
          border: '1px solid lightgreen',
        },
        icon: <CheckCircle className="h-5 w-5" color="lightgreen" />,
      },
      error: {
        style: {
          border: '1px solid var(--error)',
        },
        icon: <XCircle className="h-5 w-5" color="var(--error)" />,
      },
      icon: <Info className="h-5 w-5" />,
    }}
  />
);
