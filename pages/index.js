import Head from 'next/head'
import Link from '../src/Link';
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'
import { Stack, Button, useTheme } from '@mui/material'


export default function Home() {
  const theme = useTheme()
  // console.log(theme.palette.primary.main);
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

          <div>
            <div id='title-div'>
              <div>
                <h1 style={{ fontSize: '120px', margin: '0px', padding: '0px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>NOTETED </h1>
              </div>
            </div>
          </div>

          <Button variant="text" component={Link} noLinkStyle href="/signin">
            LOGIN
          </Button>

          <Button variant="contained" component={Link} noLinkStyle href="/signup">
            SIGN UP
          </Button>

        </Stack>
      </main>

      <style jsx>{`
        // Styling here
      `}</style>

      <style jsx global>{`
        #title-div {
            position: relative;
            height: 250px;
            width: 700px;
            margin: auto;
            color: ${theme.palette.secondary.main};
            text-align: center;
        }
        #title-div::before, #title-div::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            // z-index: -1;
            // margin: -5%;
            box-shadow: inset 0 0 0 2px;
            animation: clipMe 8s linear infinite;
        }
        #title-div::before {
            animation-delay: -4s;
        }
        @keyframes clipMe {
            0%, 100% {
              clip-path: inset(0 99% 0 0);
            }
            25% {
              clip-path: inset(99% 0 0 0);
            }
            50% {
              clip-path: inset(0 0 0 99%);
            }
            75% {
              clip-path: inset(0 0 99% 0);
            }
        }
      `}</style>
    </div>
  )
}
