import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        router.push("/dashboard")
      }
    }
  }, [loadingUser, user])

  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the Home Page!~</h1>
        <Link href={`/signup`} passHref>
          <a>Signup!</a>
        </Link>
        <p>or</p>
        <Link href={`/signin`} passHref>
          <a>Signin!</a>
        </Link>
      </main>

      <style jsx>{`
        // Styling here
      `}</style>

      <style jsx global>{`
        // html,
        // body {
        //   padding: 0;
        //   margin: 0;
        //   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        //     Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        //     sans-serif;
        // }

        // * {
        //   box-sizing: border-box;
        // }
      `}</style>
    </div>
  )
}
