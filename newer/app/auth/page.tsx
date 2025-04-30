"use client"
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { toast } from "sonner"

export default function Login() {

    const LoginWithSupaBase = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        console.log(error)
        if (error) return toast.error(error.message)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex flex-col justify-center items-center border-2 p-4 shadow-lg rounded-lg gap-2">
                <div className="flex gap-x-2 justify-between items-center">
                    <Image src="/logo.svg" width={200} height={200} alt="logo" className="w-12" />
                    <p className="font-bold text-2xl">MOKI</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/login.avif" width={200} height={200} alt="login" className="object-cover rounded-lg w-[400px] h-[250px] " />
                    <h2 className="font-bold text-2xl text-center mt-5">Welcome to MOKI</h2>
                    <p className="text-center text-gray-500">Sign in with your Google Authentication</p>
                    <Button className="mt-5 cursor-pointer w-full" onClick={LoginWithSupaBase}>Login with Google</Button>
                </div>
            </div>
        </div>
    )
}