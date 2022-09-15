import UserProvider from '../context/userContext'
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import theme from '../src/theme';

const clientSideEmotionCache = createEmotionCache();

// Custom App to wrap it with context provider
export default function App({ Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}) {
  return (
    <UserProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
      `}</style>
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
{/* <div style={{ display: "inline" }}>
        <Link href={`/`} passHref>
          <a style={{ padding: "10px 25px" }}>home</a>
        </Link>
        <Link href={`/dashboard`} passHref>
          <a style={{ padding: "10px 25px" }}>dashboard</a>
        </Link>
        <Link href={`/signin`} passHref>
          <a style={{ padding: "10px 25px" }}>signin</a>
        </Link>
        <Link href={`/signup`} passHref>
          <a style={{ padding: "10px 25px" }}>signup</a>
        </Link>
        <Link href={`/profile`} passHref>
          <a style={{ padding: "10px 25px" }}>profile</a>
        </Link>
      </div> */}