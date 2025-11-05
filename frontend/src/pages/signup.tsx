import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import { theme } from '@/styles/theme';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  padding: 1rem;
  background-color: #f9f9f9;
  overflow: hidden;
`;

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 20px;
  box-shadow: ${theme.shadows.medium};
  padding: 2.5rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.md};
  line-height: 1.3;
  background: linear-gradient(90deg, #A5D8FF 0%, #FFB5A7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const PrimaryButton = styled.button`
  display: inline-block;
  background: linear-gradient(90deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  background: white;
  color: ${theme.colors.primary.main};
  padding: 0.6rem 1.5rem;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.pill};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s;
  width: 100%;
  text-align: center;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    transform: translateY(-2px);
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.gray[600]};
  margin: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
`;

const TextLink = styled.a`
  color: ${theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
  text-align: center;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;


export default function SignupPage() {
  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <Layout>
      <PageContainer>
        <Card>
          <Title>新規登録</Title>
          <Subtitle>以下の方法で登録してください</Subtitle>
          <ButtonContainer>
            <PrimaryButton onClick={handleGoogleSignUp}>
              Googleで新規登録
            </PrimaryButton>
            <Link href="/login" passHref legacyBehavior>
              <TextLink>ログインはこちら</TextLink>
            </Link>
          </ButtonContainer>
        </Card>
      </PageContainer>
    </Layout>
  );
}
