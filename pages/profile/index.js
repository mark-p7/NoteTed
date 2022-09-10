import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import { React, useRef, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"

function Profile() {
    const router = useRouter()
    const { loadingUser, user, signOutOfUser } = useUser()

    useEffect(() => {
        if (!loadingUser) {
            console.log(user)
            if (!user) {
                router.push("/")
            }
        }
    }, [loadingUser, user])

    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOutOfUser()
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <form onSubmit={handleSignOut}>
                <button type='submit'>Sign Out</button>
            </form>
        </div>
    )
}

export default Profile