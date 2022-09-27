import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import Head from 'next/head'
import { Box, Stack, } from '@mui/material'
import Navbar from '../../components/Navbar'
import { CssTextField, SignupLoginButton, SignupTitle, BodyContainer, MainContentDiv } from '../../components/Signup-Login/SignupLogin'

function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const { signUp, loadingUser, user } = useUser()
    const [signUpError, setSignUpError] = useState(false)
    const [emailAuthError, setEmailAuthError] = useState(false)
    const [emailAuthErrorHelperText, setEmailAuthErrorHelperText] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordHelperText, setPasswordHelperText] = useState("")
    const inputTextProps = {
        style: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontSize: '20px'
        }
    }


    const handleSignup = async (e) => {
        if (password !== passwordCheck) {
            console.log('Passwords do NOT match')
            setPasswordHelperText('Passwords do NOT match')
            setSignUpError(true)
            return
        }
        const signUpCheck = await signUp(email, password)
        if (signUpCheck === 'Firebase: Error (auth/email-already-in-use).') {
            setEmailAuthError(true)
            setEmailAuthErrorHelperText("Email is ALREADY in use")
        }
        if (signUpCheck === 'Firebase: Error (auth/invalid-email).') {
            setEmailAuthError(true)
            setEmailAuthErrorHelperText("Please enter a VALID email")
        }
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }
    function handlePasswordCheckChange(e) {
        setPasswordCheck(e.target.value)
    }

    useEffect(() => {
        if (!loadingUser) {
            if (user) {
                router.push("/dashboard")
            }
        }
    }, [loadingUser, user])


    return (
        <>
            <Head>
                <title>Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar firstHelperText="Already have an account?" secondHelperText="LOGIN" route="signin" />
            <MainContentDiv>

                <BodyContainer>
                    <div style={{ position: 'relative', width: 'auto' }}>
                        <SignupTitle>
                            SIGN UP
                        </SignupTitle>
                    </div>
                    <Box
                        sx={{
                            borderLeft: '2.5px solid #1E1E1E',
                            padding: '20px',
                            height: '320px',
                            '@media screen and (max-width: 450px)': {
                                borderLeft: 'none',
                            },
                        }}
                    >
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <CssTextField
                                error={emailAuthError}
                                variant='outlined'
                                label="EMAIL"
                                type="text"
                                helperText={emailAuthErrorHelperText}
                                onChange={(e) => { handleEmailChange(e); setEmailAuthErrorHelperText(""); setEmailAuthError(false) }}
                                inputProps={inputTextProps}
                            />
                            <CssTextField
                                error={signUpError}
                                variant='outlined'
                                label="PASSWORD"
                                type="password"
                                helperText={passwordHelperText}
                                onChange={(e) => { handlePasswordChange(e); setPasswordHelperText(""); setSignUpError(false) }}
                                inputProps={inputTextProps}
                            />
                            <CssTextField
                                error={signUpError}
                                variant='outlined'
                                label="CONFIRM PASSWORD"
                                type="password"
                                helperText={passwordHelperText}
                                onChange={(e) => { handlePasswordCheckChange(e); setPasswordHelperText(""); setSignUpError(false) }}
                                inputProps={inputTextProps}
                            />

                            <SignupLoginButton
                                variant='contained'
                                onClick={() => { handleSignup() }}
                            >
                                SIGN UP
                            </SignupLoginButton>
                        </Stack>
                    </Box>
                </BodyContainer>
            </MainContentDiv>
        </>
    )
}

export default Signup