import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 16px 16px;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  background: linear-gradient(90deg, #A5D8FF 0%, #FFB5A7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Link href="/" passHref>
          <Logo>Atode</Logo>
        </Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
