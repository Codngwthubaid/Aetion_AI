"use client"
import { useUser } from "@/app/provider"
import { Loader } from "lucide-react"

export default function UserDetailsHeader() {
    const { user } = useUser()
    console.log(user)

    if (!user) return <Loader />

    return (
        <div>
            <div>
                <div>Welcome {user?.name}</div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}