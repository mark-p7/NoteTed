import { doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { getNoteData } from '../../fetchData/getNoteData'
import { updateNote } from '../../setData/updateNote'
import { deleteNote } from '../../deleteData/deleteNote'

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
        editNote();
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
        <div>
            <form onSubmit={handleEditNote}>
                <input
                    type="text"
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
                />
                <input
                    type="text"
                    onChange={(e) => setNoteContent(e.target.value)}
                    value={noteContent}
                />
                <button type='submit'>Save</button>
            </form>
            <button onClick={() => { handleDeleteNote() }}>Delete</button>
        </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const id = params
    const noteDocData = await getNoteData(id)
    return { props: { data: { id, noteDocData } } }
}

