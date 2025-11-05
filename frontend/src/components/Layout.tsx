import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Atode
            </Link>
            <div className="space-x-4">
              <Link href="/add" className="hover:underline">
                タスクを追加
              </Link>
              <Link href="/about" className="hover:underline">
                アプリについて
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Atode - タスク管理アプリ</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
