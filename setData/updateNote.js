import { updateDoc } from "firebase/firestore";

export const updateNote = async ({ noteRef, noteTitle, noteContent }) => {
    await updateDoc(noteRef, {
        NoteTitle: noteTitle,
        NoteContent: noteContent,
        CreationDate: (Date.now()/1000)
    })
    console.log("Note has been updated!")
}