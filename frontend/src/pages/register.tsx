import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';
import Layout from '@/components/Layout';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登録に失敗しました');
      }

      // 登録成功後、自動ログイン
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/');
    } catch (error: any) {
      setError(error.message || '登録中にエラーが発生しました');
    }
  };

  return (
    <Layout>
      <Container>
        <FormContainer>
          <h1>新規登録</h1>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">お名前</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">メールアドレス</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">パスワード</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </FormGroup>
            <Button type="submit">登録する</Button>
          </Form>
          <LoginLink>
            既にアカウントをお持ちの方は<Link href="/login">こちら</Link>
          </LoginLink>
        </FormContainer>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0051a8;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fff5f5;
  border-radius: 4px;
`;

const LoginLink = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  color: #666;

  a {
    color: #0070f3;
    text-decoration: none;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default RegisterPage;
