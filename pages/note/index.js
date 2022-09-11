import { doc, getFirestore, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"

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

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        });
    }

    const handleNewNote = async (e) => {
        e.preventDefault()
        let noteID = Math.random().toString(36).slice(2)
        const createNote = async () => {
            const db = getFirestore()
            await setDoc(doc(db, 'notes', noteID), {
                NoteID: noteID,
                NoteTitle: noteTitle,
                NoteContent: noteContent,
            }).then(() => {
                updateDoc(doc(db, 'users', user.uid), {
                    notes: arrayUnion(noteID)
                })
            }).then(async () => {
                await delay(1);
                router.push('/dashboard')
            })
        }
        createNote();
    }

    return (
        <div>
            <form onSubmit={handleNewNote}>
                <input
                    type="text"
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <input
                    type="text"
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Note