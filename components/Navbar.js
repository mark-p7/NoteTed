import React from 'react'
import Image from 'next/image'
// import Logo from '../images/Logo.png'
import Router from 'next/router'
import styled from '@emotion/styled'

const BodyContainer = styled('div')({
  height: '80px',
  width: '100%',
  display: 'grid',
  gridTemplateAreas: '"c . b"',
  gridTemplateColumns: '20% 50% 30%',
  ['@media (max-width:960px)']: {
    gridTemplateColumns: '30% 30% 40%',
  },
  ['@media (max-width:720px)']: {
    gridTemplateAreas: '"c b"',
    gridTemplateColumns: '30% 70%',
  },
});

function Navbar(props) {
  // console.log(Logo)
  return (
    <BodyContainer
    >
      <div style={{
        gridArea: 'b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '400',
        letterSpacing: '1px',
        paddingTop: '20px'
      }}>
        <p>{props.firstHelperText} <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => Router.push(`/${props.route}`)}>{props.secondHelperText}</span></p>
      </div>
      <div style={{ gridArea: 'c', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
        <Image src="/images/MiniLogo.png" alt="Logo" width="56.24" height="56.24" style={{ cursor: 'pointer' }} onClick={() => Router.push('/')} />
      </div>
    </BodyContainer>
  )
}

export default Navbar