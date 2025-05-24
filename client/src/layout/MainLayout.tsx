import { ReactNode } from 'react';
import { PageContainer } from './PageContainer';
import { Header } from './Header';
import { Card } from '@/components/Card';
import { Footer } from './Footer';
import { CustomToaster } from '@/components/CustomToaster';

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
        <div className="flex flex-1 items-center justify-center">
          <Card className="min-h-[500px] w-full max-w-[900px] p-10">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {children}
          </Card>
        </div>
      </PageContainer>
      {/* <Footer
        text="This is a fun learning project and is not affiliated with NASA or SpaceX."
        githubUrl="https://github.com/Evita-M"
      /> */}
    </div>
  );
};
