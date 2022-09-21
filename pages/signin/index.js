import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { useTheme, TextField, Box, Stack, styled, Button } from '@mui/material'

const CssTextField = styled(TextField)({
    width: '250px',
    '& label': {
        color: '#1E1E1E',
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: '10%',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '400',
        letterSpacing: '3px',
    },
    '& label.Mui-focused': {
        color: '#1E1E1E',
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: '10%',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '400',
        letterSpacing: '3px',
    },
    // '& .MuiInput-underline:after': {
    //     borderBottomColor: 'red',
    // },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            border: '1px solid transparent',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid transparent'
        },
    },
})

const SignupLoginButton = styled(Button)({
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '400',
    borderRadius: '0px',
    letterSpacing: '3px',
    color: 'white',
    cursor: 'pointer',
    position: 'relative',
    padding: '7.5px 60px',
    background: '#1E1E1E',
    fontSize: '20px',
    transition: 'all 0.2s',
    '&:hover': {
        boxShadow: '0.3em 0.3em 0 0 #1E1E1E',
        color: '#1E1E1E',
        background: 'white',
        padding: '7.5px 70px'
    }
});

const SignupTitle = styled('h1')({
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '400',
    letterSpacing: '3px',
    padding: '0px 20px 0px 0px',
    margin: '0',
    position: 'absolute',
    bottom: '0',
    right: '0',
    fontSize: '120px',
    ['@media (max-width:680px)']: {
        fontSize: '80px',
        right: 'auto',
        width: 'auto',
        padding: '0',
        width: '100%',
        textAlign: 'center'
    },
    ['@media (max-width:450px)']: {
        fontSize: '50px',
    }
});

const BodyContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    width: '900px',
    ['@media (max-width:680px)']: {
        gridTemplateColumns: 'none',
        gridTemplateRows: '30% 70%',
        height: '90vh',
        width: '400px'
    }
});

function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loadingUser, user } = useUser()
    const theme = useTheme()
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
            <div style={{ height: 'calc(100vh - 80px)', background: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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
            </div>
        </>
    )
}

export default SignIn