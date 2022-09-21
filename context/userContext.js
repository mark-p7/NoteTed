import { useState, useEffect, createContext, useContext } from 'react'
import { createFirebaseApp } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

export const UserContext = createContext()

// Custom hook that shorthands the context!
// export const useUser = () => useContext(UserContext)
export function useUser() {
  return useContext(UserContext)
}

export default function UserContextComp({ children }) {
  // Listen authenticated user
  const app = createFirebaseApp()
  const auth = getAuth(app)

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.log(err.message)
      return err.message
    })
  }

  async function signOutOfUser() {
    try {
      await signOut(auth)
      console.log("Sign-Out Successful")
    } catch (err) {
      console.log(err)
    }
  }

  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      const user = cred.user
      const db = getFirestore()
      setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          notes: []
      })
      console.log("user added to firestore")
    }).catch((err)=>{
      console.log(err.message)
      return err.message
    })
  }

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL })
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, login, signUp, signOutOfUser }}>
      {children}
    </UserContext.Provider>
  )
}
