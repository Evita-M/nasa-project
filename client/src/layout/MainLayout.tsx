import { ReactNode } from 'react';
import { PageContainer } from './PageContainer';
import { Header } from './Header';
import { Card } from '@/components/Card';
import { Footer } from './Footer';
import { CustomToaster } from '@/components/CustomToaster';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <PageContainer>
        <Header />
      </PageContainer>
      <PageContainer className="relative flex flex-1 h-full flex-col items-center justify-center">
        <CustomToaster />
        <Card className="min-h-[520px] max-w-[900px]">{children}</Card>
      </PageContainer>
      <Footer
        text="This is a fun learning project and is not affiliated with NASA or SpaceX."
        githubUrl="https://github.com/Evita-M"
      />
    </div>
  );
};
