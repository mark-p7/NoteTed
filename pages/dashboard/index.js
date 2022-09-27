import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { collection, query, where, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import Link from 'next/link'
import { deleteNote } from '../../deleteData/deleteNote'
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import Head from 'next/head';
import { TitleDiv } from '../../components/Titlediv';
import { NotesColumn, BodyContainer, LinkButton, NoteDiv } from '../../components/dashboard/Dashboard';

function Dashboard() {
    const router = useRouter()
    const { loadingUser, user } = useUser()
    const db = getFirestore()
    const [splitNotesArray, setSplitNotesArray] = useState([])
    const noteColumnArray = ["first-column", "second-column", "third-column"]
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        if (!loadingUser) {
            if (!user) {
                router.push("/signup")
            } else {
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef).then(snap => {
                    try {
                        let notesArray = snap.data().notes
                        if (notesArray != 0) {
                            const noteQuery = query(collection(db, "notes"), where("NoteID", "in", notesArray));
                            getDocs(noteQuery).then(querySnapshot => {
                                var jsxNotesArray = []
                                querySnapshot.forEach((doc) => {
                                    let data = doc.data()
                                    jsxNotesArray.push(
                                        {
                                            id: doc.id,
                                            title: data.NoteTitle,
                                            content: data.NoteContent,
                                            creationDate: data.CreationDate
                                        }
                                    )
                                })
                                // Print notes for debugging
                                // jsxNotesArray.forEach(item => {
                                //     console.log(item);
                                // })
                                const numberOfChunks = jsxNotesArray.length >= 3 ? 3 : jsxNotesArray.length
                                setSplitNotesArray(splitToChunks(jsxNotesArray, numberOfChunks))
                            })
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })
            }
        }
    }, [loadingUser, user])

    useEffect(() => {
        setBusy(false)
    }, [splitNotesArray])

    const handleDeleteNote = async (noteId) => {
        const delNote = async () => {
            let userId = user.uid
            await deleteNote({ db, noteId, userId })
        }
        await delNote();
        router.reload(window.location.pathname)
    }

    function splitToChunks(array, parts) {
        array.sort((firstNote, secondNote) =>
            secondNote.creationDate - firstNote.creationDate
        )
        let result = []
        if (parts == 1) {
            result.push([array[0]])
            return result
        }
        if (parts == 2) {
            result.push([array[0]])
            result.push([array[1]])
            return result
        }
        var currentColumn = 0;
        for (let i = 0; i < array.length; i++) {
            if (result[currentColumn] == null) {
                result.push([array[i]])
            } else {
                result[currentColumn].push(array[i])
            }
            if (currentColumn == 2) {
                currentColumn = 0
            } else {
                currentColumn = currentColumn + 1
            }
        }
        return result;
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ width: '100%', textAlign: 'center', padding: '0px' }}>
                <ResponsiveAppBar />
                <TitleDiv>
                    <h1>DASHBOARD</h1>
                </TitleDiv>
                <BodyContainer>
                    {
                        isBusy ? console.log('still busy') :
                            splitNotesArray.map((noteArrayColumn, index) =>
                                <NotesColumn key={index} className={noteColumnArray[index]}>
                                    {noteArrayColumn.map(note => (
                                        <NoteDiv key={note.id}>
                                            <h1 style={{ wordWrap: 'break-word' }}>
                                                {note.title}
                                            </h1>
                                            <p style={{ wordWrap: 'break-word' }}>
                                                {note.content}
                                            </p>
                                            <div style={{ textAlign: 'right' }}>
                                                <Link href={`/note/${note.id}`} passHref>
                                                    <LinkButton>
                                                        EDIT
                                                    </LinkButton>
                                                </Link>
                                                <LinkButton onClick={() => handleDeleteNote(note.id)}>
                                                    DELETE
                                                </LinkButton>
                                            </div>
                                        </NoteDiv>
                                    ))}
                                </NotesColumn>
                            )
                    }
                </BodyContainer>
            </div>
        </>
    )
}

export default Dashboard