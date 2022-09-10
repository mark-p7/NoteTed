import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import { React, useRef, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import { collection, query, where, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import Link from 'next/link'

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
                
                // console.log(getDoc(doc(db, 'users', user.uid)))
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                // console.log("Document data:", docSnap.data());
                try {
                    let notesArray = docSnap.data().notes
                    if (notesArray != 0) {
                        const noteQuery = query(collection(db, "notes"), where("NoteID", "in", notesArray));
                        const querySnapshot = await getDocs(noteQuery);

                        var jsxNotesArray = []
                        querySnapshot.forEach((doc) => {
                            let data = doc.data()
                            // console.log(doc.id, " => ", doc.data());
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

    // console.log(userDoc)
    // const noteQuery = query(collection(db, "notes"), where("NoteID", "in", userDoc.notes));
    // const querySnapshot = async => getDocs(noteQuery);

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
                    </div>)}
            </div>
        </div>
    )
}

export default Dashboard