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
      <main className="flex flex-col min-h-screen">{children}</main>
    </>
  );
};

export default PublicLayout;
