import styled from "@emotion/styled";

export const TitleDiv = styled('div')({
    width: '80%',
    textAlign: 'left',
    color: 'black',
    fontSize: '50px',
    margin: '20px auto 20px auto',
    ['@media (max-width:800px)']: {
        textAlign: 'center',
        fontSize: '30px',
    },
    ['@media (max-width:480px)']: {
        fontSize: '25px',
    },
});