import Head from 'next/head'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useRouter } from 'next/router'
import { Stack, Button, useTheme } from '@mui/material'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Home() {
  const theme = useTheme()
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
      <Navbar/>
      <main style={{ height: 'calc(100vh - 80px)', background: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >

          <div className='title-div'>
            <div>
              <h1 className='title-header'>
                NoteTed
              </h1>
            </div>
          </div>


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
        
        .title-div {
          position: relative;
          height: 250px;
          width: 700px;
          margin: auto auto 100px auto;
          color: black;
          text-align: center;
        }
        
        .title-div:before,
        .title-div:after {
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
        
        .title-div:before {
          animation-delay: -4s;
        }
        
        .title-header {
          font-size: 120px;
          margin: 0px;
          padding: 0px;
          font-weight: 400;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: 4px 4px #CAC8C8;
        }
        
        @keyframes clipMe {
        
          0%,
          100% {
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
        
        @media (max-width: 700px) {
          .title-div {
            height: 250px;
            width: 400px;
          }
        
          .title-header {
            font-size: 70px;
          }
        }
        
        @media (max-width: 430px) {
          .title-div {
            height: 250px;
            width: 300px;
          }
        
          .title-header {
            font-size: 50px;
            text-shadow: 3px 3px #CAC8C8;
          }
        }
        
        @media (max-width: 310px) {
          .title-div {
            height: 250px;
            width: 250px;
          }
        
          .title-header {
            font-size: 40px;
            text-shadow: 2px 2px #CAC8C8;
          }
        }
      `}</style>
    </div>
  )
}
