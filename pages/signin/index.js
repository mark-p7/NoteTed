import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import Head from 'next/head'
import { Box, Stack, } from '@mui/material'
import Navbar from '../../components/Navbar'
import { CssTextField, SignupLoginButton, SignupTitle, BodyContainer, MainContentDiv} from '../../components/Signup-Login/SignupLogin'

function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loadingUser, user } = useUser()
    const inputTextProps = {
        style: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontSize: '20px'
        }
    }

    // Email Check
    const [emailAuthError, setEmailAuthError] = useState(false)
    const [emailAuthErrorHelperText, setEmailAuthErrorHelperText] = useState("")

    // Password Check
    const [passwordError, setPasswordError] = useState(false)
    const [passwordHelperText, setPasswordHelperText] = useState("")


    const handleSignIn = async (e) => {
        const loginCheck = await login(email, password)
        if (loginCheck === "Firebase: Error (auth/wrong-password).") {
            console.log("Password is wrong")
            setPasswordError(true)
            setPasswordHelperText("INCORRECT password")
        }
        if (loginCheck === "Firebase: Error (auth/user-not-found).") {
            console.log("Email not found")
            setEmailAuthError(true)
            setEmailAuthErrorHelperText("Email NOT found")
        }
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
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar firstHelperText="Don't have an account?" secondHelperText="SIGN UP" route="signup" />
            <MainContentDiv>

                <BodyContainer>
                    <div style={{ position: 'relative', width: 'auto' }}>
                        <SignupTitle>
                            LOGIN
                        </SignupTitle>
                    </div>
                    <Box
                        sx={{
                            borderLeft: '2.5px solid #1E1E1E',
                            padding: '20px',
                            height: '230px',
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
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailAuthError(false)
                                    setEmailAuthErrorHelperText("")
                                }}
                                inputProps={inputTextProps}
                            />
                            <CssTextField
                                error={passwordError}
                                variant='outlined'
                                label="PASSWORD"
                                type="password"
                                helperText={passwordHelperText}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false)
                                    setPasswordHelperText("")
                                }}
                                inputProps={inputTextProps}
                            />

                            <SignupLoginButton
                                variant='contained'
                                onClick={() => { handleSignIn() }}
                            >
                                LOGIN
                            </SignupLoginButton>
                        </Stack>
                    </Box>
                </BodyContainer>
                </MainContentDiv>
        </>
    )
}

export default SignIn