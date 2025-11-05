import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session;
    [key: string]: any;
  };
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: 'Noto Sans JP', sans-serif;
    color: #333;
    line-height: 1.6;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithSession) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
