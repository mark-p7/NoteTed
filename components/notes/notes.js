import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const LinkButton = styled('a')({
    padding: '12px',
    textDecoration: 'none',
    position: 'relative',
    color: 'black',
    cursor: 'pointer',
    fontWeight: '600',
    '&:after': {
        background: 'none repeat scroll 0 0 transparent',
        bottom: '0',
        content: '""',
        display: 'block',
        height: '2px',
        left: '50%',
        position: 'absolute',
        background: '#000',
        transition: 'width 0.3s ease 0s, left 0.3s ease 0s',
        width: '0'
    },
    '&:hover:after': {
        width: '100%',
        left: '0',
    },
});

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