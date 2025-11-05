import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const WelcomeCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 20px;
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.xxl} ${theme.spacing.xxl};
  max-width: 575px;
  width: 90%;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.3;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.lg};
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background: linear-gradient(90deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  background: white;
  color: ${theme.colors.primary.main};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s;
  min-width: 160px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    transform: translateY(-2px);
  }
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Atode - タスク管理アプリ</title>
        <meta name="description" content="シンプルで使いやすいタスク管理アプリ" />
      </Head>
      
      <WelcomeCard>
        <Title>Atode へようこそ</Title>
        <Subtitle>TODOより自由に。あとでやる、もちゃんと管理。</Subtitle>
        <ButtonContainer>
          <Link href="/login" passHref legacyBehavior>
            <SecondaryButton as="a" data-cy="login-button">ログイン</SecondaryButton>
          </Link>
          <PrimaryButton 
            as="button" 
            onClick={(e) => {
              e.preventDefault();
              alert('新規登録機能は現在準備中です');
            }}
            style={{ cursor: 'not-allowed', opacity: 0.7 }}
          >
            新規登録
          </PrimaryButton>
        </ButtonContainer>
      </WelcomeCard>
    </Layout>
  );
};

export default Home;
