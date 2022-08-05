import Header from '@/components/Header/Header';
import Head from 'next/head';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Auth Layout</title>
        <meta name="description" content="Logged in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col min-h-screen">{children}</main>
    </>
  );
};

export default AuthLayout;
