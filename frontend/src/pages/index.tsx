import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Atode - タスク管理アプリ</title>
        <meta name="description" content="シンプルなタスク管理アプリ" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">タスク一覧</h1>
        {/* タスク一覧がここに入ります */}
      </div>
    </Layout>
  );
};

export default Home;
