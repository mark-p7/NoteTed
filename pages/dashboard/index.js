import Router, { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { collection, query, where, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import Link from 'next/link'
import { deleteNote } from '../../deleteData/deleteNote'
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { styled } from '@mui/material';

const NotesDiv = styled('div')({
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

const TitleDiv = styled('div')({
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

const BodyContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'left',
    padding: '0px 10px',
    width: 'auto',
});

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

function Dashboard() {
    const router = useRouter()
    const { loadingUser, user } = useUser()
    const db = getFirestore()
    const [notes, setNotes] = useState([]);
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
                                setNotes(jsxNotesArray)
                                const notesCopy = [...jsxNotesArray]
                                const numberOfChunks = notesCopy.length >= 3 ? 3 : notesCopy.length
                                setSplitNotesArray(splitToChunks(notesCopy, numberOfChunks))
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
        <div style={{ width: '100%', textAlign: 'center', padding: '0px' }}>
            <ResponsiveAppBar />
            <TitleDiv>
                <h1>DASHBOARD</h1>
            </TitleDiv>
            <BodyContainer>
                {
                    isBusy ? console.log('still busy') :
                        splitNotesArray.map((noteArrayColumn, index) =>
                            <NotesDiv key={index} className={noteColumnArray[index]}>
                                {noteArrayColumn.map(note => (
                                    <div key={note.id}
                                        style={{
                                            padding: '20px',
                                            border: '3px solid black',
                                            borderRadius: '20px',
                                            marginTop: '8px',
                                            width: '100%',
                                            verticalAlign: 'middle'
                                        }}>
                                        <h1 style={{wordWrap: 'break-word'}}>
                                            {note.title}
                                        </h1>
                                        <p style={{wordWrap: 'break-word'}}>
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
                                    </div>
                                ))}
                            </NotesDiv>
                        )
                }
            </BodyContainer>
        </div>
    )
}

export default Dashboard