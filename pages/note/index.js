import { async } from '@firebase/util'
import { doc, getFirestore, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
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
            // console.log(user)
            if (!user) {
                router.push("/signup")
            }
        }
    }, [loadingUser, user])

    const handleNewNote = async (e) => {
        e.preventDefault()
        // const createUser = async () => {
        //   const db = getFirestore()
        //   await setDoc(doc(db, 'profile', profile.username), profile)

        //   alert('User created!!')
        // }
        console.log(noteTitle)
        console.log(noteContent)
        let noteID = Math.random().toString(36).slice(2)
        console.log(noteID)
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
            }).then(() => {
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