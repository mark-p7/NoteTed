import { TextField, styled, Button } from '@mui/material'

export const CssTextField = styled(TextField)({
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

export const SignupLoginButton = styled(Button)({
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

export const SignupTitle = styled('h1')({
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

export const BodyContainer = styled('div')({
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

export const MainContentDiv = styled('div')({
    height: 'calc(100vh - 80px)', 
    background: 'white', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
})