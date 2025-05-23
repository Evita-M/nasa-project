import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/ui/Card';
import { CustomToaster } from '@/components/ui/CustomToaster';
import { PageContainer } from './PageContainer';
import { Footer } from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: string | null;
}

export const MainLayout = ({ children, isLoading, error }: MainLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <PageContainer>
        <Header />
      </PageContainer>
      <PageContainer className="relative flex h-screen flex-col">
        <CustomToaster />
        <div className="flex flex-1 items-center justify-center px-2 py-8">
          <Card className="min-h-[500px] w-full max-w-[900px]">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {children}
          </Card>
        </div>
      </PageContainer>
      <Footer
        text="This is a fun learning project and is not affiliated with NASA or SpaceX."
        githubUrl="https://github.com/Evita-M"
      />
    </div>
  );
};
