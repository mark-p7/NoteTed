import Head from 'next/head'
// import Link from '../src/Link';
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'
import { Stack, Button, useTheme } from '@mui/material'
import Link from 'next/link'
import { TitleDiv, TitleHeader } from './HomePageStyles'

export default function Home() {
  const theme = useTheme()
  //   <Link href="/about">
  //      <a>About Us</a>
  //   </Link>
  // console.log(theme.palette.primary.main);
  //   <Button variant="contained" component={Link} noLinkStyle href="/signup">
  //      SIGN UP
  //   </Button>
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
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: '100vh', background: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >

          <TitleDiv>
            <div>
              <TitleHeader>
                NoteTed
              </TitleHeader>
            </div>
          </TitleDiv>


          <Link href="/signin">
            <a className='styled-link'>LOGIN</a>
          </Link>

          <Link href="/signup">
            <a className='styled-link'>SIGN UP</a>
          </Link>

        </Stack>
      </main>

      <style jsx>{`
        // Styling here
      `}</style>

      <style jsx global>{`
        .styled-link {
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.15em;
          display: inline-block;
          padding: 15px 20px;
          position: relative;
        }
        .styled-link:after {    
          background: none repeat scroll 0 0 transparent;
          bottom: 0;
          content: "";
          display: block;
          height: 2px;
          left: 50%;
          position: absolute;
          background: #000;
          transition: width 0.3s ease 0s, left 0.3s ease 0s;
          width: 0;
        }
        .styled-link:hover:after { 
          width: 100%; 
          left: 0;
        }
      `}</style>
    </div>
  )
}
