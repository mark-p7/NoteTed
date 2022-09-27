import { doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { getNoteData } from '../../fetchData/getNoteData'
import { updateNote } from '../../setData/updateNote'
import { deleteNote } from '../../deleteData/deleteNote'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import { Stack } from '@mui/material';
import Head from 'next/head'
import { TitleDiv } from '../../components/Titlediv'
import { LinkButton, CssTextField } from '../../components/notes/notes'

export default function NoteID({ data }) {
    const { id, noteDocData } = data
    const router = useRouter()
    const { loadingUser, user } = useUser()
    const [noteTitle, setNoteTitle] = useState(noteDocData.NoteTitle);
    const [noteContent, setNoteContent] = useState(noteDocData.NoteContent);
    const db = getFirestore()

    useEffect(() => {
        if (!loadingUser) {
            if (!user) {
                router.push("/signup")
            }
        }
    }, [loadingUser, user])

    const handleEditNote = async (e) => {
        e.preventDefault()
        const editNote = async () => {
            const noteRef = doc(db, 'notes', id.noteid);
            await updateNote({ noteRef, noteTitle, noteContent })
        }
        await editNote();
        router.push('/dashboard')
    }

    const handleDeleteNote = async (e) => {
        const delNote = async () => {
            let noteId = id.noteid
            let userId = user.uid
            await deleteNote({ db, noteId, userId })
        }
        await delNote();
        router.push("/dashboard")
    }

    return (
        <>
            <Head>
                <title>Edit Note</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResponsiveAppBar />
            <TitleDiv>
                <h1 style={{ margin: '15px 0px' }}>EDIT NOTE</h1>
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
                        type="text"
                        style={{ width: '100%' }}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
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
                        type="text"
                        style={{
                            width: '100%',
                            margin: '20px 0px 0px 0px'
                        }}
                        multiline
                        rows={8}
                        onChange={(e) => setNoteContent(e.target.value)}
                        value={noteContent}
                        inputProps={{
                            style: {
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '400',
                                fontSize: '20px'
                            }, maxLength: 280,
                        }}
                    />
                </Stack>
                <div style={{ width: '100%', margin: '20px 0', textAlign: 'right', fontSize: '22.5px' }}>
                    <LinkButton onClick={handleEditNote}>
                        SAVE
                    </LinkButton>
                    <LinkButton onClick={handleDeleteNote}>
                        DELETE
                    </LinkButton>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }) => {
    const id = params
    const noteDocData = await getNoteData(id)
    return { props: { data: { id, noteDocData } } }
}

