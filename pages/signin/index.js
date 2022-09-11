import { useRouter } from 'next/router'
import { React, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"

function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loadingUser, user } = useUser()

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (err) {
            console.log(err.message)
            if (err.message === "Firebase: Error (auth/wrong-password).") {
                console.log("Password is wrong")
            }
            if (err.message === "Firebase: Error (auth/user-not-found).") {
                console.log("Email not found")
            }
        }
    }

    useEffect(() => {
        if (!loadingUser) {
            if (user) {
                router.push("/dashboard")
            }
        }
    }, [loadingUser, user])

    return (
        <div>
            <h1>
                SignIn
            </h1>

            <form onSubmit={handleSignIn}>
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

export default SignIn