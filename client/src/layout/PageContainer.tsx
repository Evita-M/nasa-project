import { FC, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: FC<PageContainerProps> = ({
  children,
  className = '',
}) => <div className={`container mx-auto ${className}`}>{children}</div>;
