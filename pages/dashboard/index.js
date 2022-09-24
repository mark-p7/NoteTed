import Router, { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { collection, query, where, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import Link from 'next/link'
import { deleteNote } from '../../deleteData/deleteNote'
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { NavbarButton } from '../../components/ResponsiveAppBar';
import { styled } from '@mui/material';

const BodyContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 4px',
    textAlign: 'left',
    margin: 'auto'
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
        <div style={{ width: '100%', textAlign: 'center' }}>
            <ResponsiveAppBar />
            <div style={{ width: '80%', textAlign: 'left', color: 'black', fontSize: '50px', margin: '20px auto 20px auto' }}>
                Dashboard
            </div>
            {/* <button onClick={() => router.push("/note")}>Create a new Note</button> */}
            <BodyContainer>
                {
                    isBusy ? console.log('still busy') :
                        splitNotesArray.map((noteArrayColumn, index) =>
                            <div key={index} className={noteColumnArray[index]} style={{ flex: '25%', maxWidth: '33%', padding: '5px 8px' }}>
                                {noteArrayColumn.map(note => (
                                    <div key={note.id} style={{ padding: '20px', border: '3px solid black', borderRadius: '20px', margin: '10px', width: '100%' }}>
                                        <h1>
                                            {note.title}
                                        </h1>
                                        <p>
                                            {note.content}
                                        </p>
                                        {/* <Link href={`/note/${note.id}`} passHref>
                                        <a>
                                        </a>
                                    </Link> */}
                                        <NavbarButton onClick={() => Router.push(`/note/${note.id}`)}>
                                            edit
                                        </NavbarButton>

                                        <br />
                                        <NavbarButton onClick={() => handleDeleteNote(note.id)}>
                                            delete
                                        </NavbarButton>
                                    </div>
                                ))}
                            </div>
                        )
                }
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                {/* {notes.map(note =>
                    <div key={note.id} style={{ padding: '20px', border: '1px solid black', margin: '10px' }}>
                        <h1>
                            {note.title}
                        </h1>
                        <p>
                            {note.content}
                        </p>
                        <Link href={`/note/${note.id}`} passHref>
                            <a>
                                <button>
                                    edit
                                </button>
                            </a>
                        </Link>
                        <br />
                        <button onClick={() => handleDeleteNote(note.id)}>
                            delete
                        </button>
                    </div>)} */}
            </BodyContainer>
        </div>
    )
}

export default Dashboard