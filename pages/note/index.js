import { doc, getFirestore, setDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { styled, TextField, Stack } from '@mui/material';
import Head from 'next/head'
import { TitleDiv } from '../../components/Titlediv'

const LinkButton = styled('a')({
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

const CssTextField = styled(TextField)({
    width: '250px',
    '& label': {
        color: '#1E1E1E',
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: '10%',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '400',
        letterSpacing: '3px',
        // fontSize: "25px",
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

function Note() {
    const router = useRouter()
    const { loadingUser, user } = useUser()
    const [noteContent, setNoteContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    useEffect(() => {
        if (!loadingUser) {
            if (!user) {
                router.push("/signup")
            }
        }
    }, [loadingUser, user])

    // function delay(n) {
    //     return new Promise(function (resolve) {
    //         setTimeout(resolve, n * 1000);
    //     });
    // }

    const handleNewNote = async (e) => {
        e.preventDefault()
        let noteID = Math.random().toString(36).slice(2)
        const createNote = async () => {
            const db = getFirestore()
            await setDoc(doc(db, 'notes', noteID), {
                NoteID: noteID,
                NoteTitle: noteTitle,
                NoteContent: noteContent,
                CreationDate: (Date.now() / 1000)
            }).then(() => {
                updateDoc(doc(db, 'users', user.uid), {
                    notes: arrayUnion(noteID)
                })
            }).then(async () => {
                router.push('/dashboard')
            })
        }
        createNote();
    }

    return (
        <>
            <Head>
                <title>Add Note</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResponsiveAppBar />
            <TitleDiv>
                <h1 style={{ margin: '15px 0px' }}>ADD NOTE</h1>
            </TitleDiv>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Stack
                    style={{ padding: '25px', border: '3px solid black', borderRadius: '10px' }}
                    direction="column"
                    justifyContent="center"
                    alignItems="left"
                >
                    <CssTextField
                        variant='outlined'
                        label="TITLE"
                        type="text"
                        style={{ width: '100%' }}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        inputProps={{
                            style: {
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '400',
                                fontSize: '30px'
                            }, maxLength: 16,
                        }}
                    />
                    <CssTextField
                        variant='outlined'
                        label="CONTENT"
                        type="text"
                        style={{
                            width: '100%',
                            margin: '20px 0px 0px 0px'
                        }}
                        multiline
                        rows={8}
                        onChange={(e) => setNoteContent(e.target.value)}
                        inputProps={{
                            style: {
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '400',
                                fontSize: '20px'
                            }, maxLength: 280,
                        }}
                    />
                </Stack>
                <div style={{ width: '80%', margin: '20px auto', textAlign: 'right', fontSize: '22.5px' }}>
                    <LinkButton onClick={handleNewNote}>
                        CREATE
                    </LinkButton>
                </div>
            </div>
        </>
    )
}

export default Note