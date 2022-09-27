import styled from "@emotion/styled";

export const NotesColumn = styled('div')({
    flex: '33.333%',
    maxWidth: '33.333%',
    padding: '5px 8px',
    ['@media (max-width:920px)']: {
        flex: '50%',
        flexWrap: 'wrap',
        maxWidth: '50%',
    },
    ['@media (max-width:750px)']: {
        flex: '100%',
        maxWidth: '100%',
    },
});

export const BodyContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'left',
    padding: '0px 10px',
    width: 'auto',
});

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

export const NoteDiv = styled('div')({
    padding: '20px',
    border: '3px solid black',
    borderRadius: '20px',
    marginTop: '8px',
    width: '100%',
    verticalAlign: 'middle'
})