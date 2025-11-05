import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const Footer = styled.footer`
  background-color: #ffffff;
  padding: 1.5rem 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
  border-radius: 16px 16px 0 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <MainContent>
        {children}
      </MainContent>
      
      <Footer>
        <FooterContent>
          <p>© {new Date().getFullYear()} Atode - タスク管理アプリ</p>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
