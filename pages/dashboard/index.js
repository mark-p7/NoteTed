import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import { React, useRef, useState, useEffect } from 'react'
import { useUser } from "../../context/userContext"
import Link from 'next/link'

function Dashboard() {
    const router = useRouter()
    const { loadingUser, user } = useUser()

    useEffect(() => {
        if (!loadingUser) {
            console.log(user)
            if (!user) {
                router.push("/signup")
            }
        }
    }, [loadingUser, user])

    return (
        <div>
            <h1>Dashboard</h1>
            <Link href={`/profile`} passHref>
                <a>Go to Profile Page</a>
            </Link>
        </div>
    )
}

export default Dashboard