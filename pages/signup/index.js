import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import Head from 'next/head'
import { useTheme, TextField, Box, Stack, styled, Button } from '@mui/material'
import Navbar from '../../components/Navbar'

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

function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordHelperText, setPasswordHelperText] = useState("")
    const { signUp, loadingUser, user } = useUser()
    const [signUpError, setSignUpError] = useState(false)
    const [emailAuthError, setEmailAuthError] = useState(false)
    const [emailAuthErrorHelperText, setEmailAuthErrorHelperText] = useState("")
    const theme = useTheme()
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
            <Navbar firstHelperText="Already have an account?" secondHelperText="LOGIN" />
            <div style={{ height: 'calc(100vh - 80px)', background: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
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
            </div>
        </>
    )
}

export default Signup