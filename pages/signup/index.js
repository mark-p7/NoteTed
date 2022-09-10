import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"

function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp, loadingUser, user } = useUser()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password)
        } catch (err) {
            console.log(err.message)
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                console.log("Email is ALREADY in use")
            }
        }
    }

    useEffect(() => {
      if (!loadingUser) {
        console.log(user)
        if (user) {
          router.push("/dashboard")
        }
      }
    }, [loadingUser, user])

    return (
        <div>
            <h1>
                Signup
            </h1>

            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default Signup