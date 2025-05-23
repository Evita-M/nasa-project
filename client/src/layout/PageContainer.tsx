import { FC, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: FC<PageContainerProps> = ({
  children,
  className = '',
}) => (
  <div className={`max-w-[1440px] w-full mx-auto px-2 ${className}`}>
    {children}
  </div>
);
