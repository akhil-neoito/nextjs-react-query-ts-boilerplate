import Header from '@/components/Header/Header';
import Head from 'next/head';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Public Layout</title>
        <meta name="description" content="Logged in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col min-h-screen">
        <div className="flex flex-col justify-center h-screen">{children}</div>
      </main>
    </>
  );
};

export default PublicLayout;
