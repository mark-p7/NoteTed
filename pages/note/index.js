import { doc, getFirestore, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { Stack } from '@mui/material';
import Head from 'next/head'
import { TitleDiv } from '../../components/Titlediv'
import { LinkButton, CssTextField } from '../../components/notes/notes'

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
                }).then(() => {
                    router.push('/dashboard')
                })
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
                            }
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
                            }
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