"use client"
import { useUser } from "@/app/provider"
import { Loader } from "lucide-react"
import Image from "next/image"

export default function UserDetailsHeader() {
    const { user } = useUser()
    console.log(user)

    if (!user) return <Loader />

    return (
        <div className="flex justify-between items-center shadow-md p-5 rounded-md">
            <div>
                <div className="font-bold text-lg">Welcome, {user?.name}</div>
                <div className="text-gray-500">AI driven mock interview, hassel-free interview preparations</div>
            </div>
            <div>
                <Image src={user?.picture} alt={user?.name} width={40} height={40} className="rounded-full" />
            </div>
        </div>
    )
}