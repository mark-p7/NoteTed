import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { collection, query, where, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import Link from 'next/link'
import { deleteNote } from '../../deleteData/deleteNote'

function Dashboard() {
    const router = useRouter()
    const { loadingUser, user } = useUser()
    const db = getFirestore()
    const [notes, setNotes] = useState([]);

    useEffect(async () => {
        if (!loadingUser) {
            if (!user) {
                router.push("/signup")
            } else {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                try {
                    let notesArray = docSnap.data().notes
                    if (notesArray != 0) {
                        const noteQuery = query(collection(db, "notes"), where("NoteID", "in", notesArray));
                        const querySnapshot = await getDocs(noteQuery);

                        var jsxNotesArray = []
                        querySnapshot.forEach((doc) => {
                            let data = doc.data()
                            jsxNotesArray.push(
                                {
                                    id: doc.id,
                                    title: data.NoteTitle,
                                    content: data.NoteContent
                                }
                            )
                        });
                        setNotes(jsxNotesArray)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

    }, [loadingUser, user])

    const handleDeleteNote = async (noteId) => {
        const delNote = async () => {
            let userId = user.uid
            await deleteNote({ db, noteId, userId })
        }
        await delNote();
        router.reload(window.location.pathname)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => router.push("/note")}>Create a new Note</button>
            <div>
                {notes.map(note =>
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
                    </div>)}
            </div>
        </div>
    )
}

export default Dashboard