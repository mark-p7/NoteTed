import { doc, deleteDoc, arrayRemove, updateDoc } from "firebase/firestore";

export const deleteNote = async ({db, noteId, userId}) => {
    const noteRef = doc(db, "notes", noteId);
    const userRef = doc(db, "users", userId);
    await deleteDoc(noteRef)
    await updateDoc(userRef, {
        notes: arrayRemove(noteId)
    })
    console.log("Note has been deleted!")
}