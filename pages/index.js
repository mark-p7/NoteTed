import { getFirestore, setDoc, doc } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'

export default function Home() {

  // Initialize Router
  const router = useRouter()

  // Link to Serverside Route
  // <Link href={`/profile/${profile.username}`} passHref>
  //   <a>Go to SSR Page</a>
  // </Link>

  // Create User
  // <button onClick={createUser}>Create 'nextjs_user'</button>

  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  const profile = { username: 'nextjs_user', message: 'Awesome!!' }

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
      if (!user) {
        router.push("/signup")
      }
    }
    // You also have your firebase app initialized
  }, [loadingUser, user])

  const createUser = async () => {
    const db = getFirestore()
    await setDoc(doc(db, 'profile', profile.username), profile)

    alert('User created!!')
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      Hello, {user.email}
      </main>

      <style jsx>{`
        // Styling here
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
