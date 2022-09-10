import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import { React, useRef, useState } from 'react'
import { useUser } from "../../context/userContext"

function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUser()

    const handleSignup = async (e) => {
        console.log(email + " " + password)
        e.preventDefault()
        try {
            await signUp(email, password)
        } catch (err) {
            console.log(err)
        }
        router.push("/")
    }

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