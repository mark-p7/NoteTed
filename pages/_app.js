import UserProvider from '../context/userContext'
import Link from 'next/link'

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <div style={{ display: "inline" }}>
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
      </div>
      <Component {...pageProps} />
    </UserProvider>
  )
}
