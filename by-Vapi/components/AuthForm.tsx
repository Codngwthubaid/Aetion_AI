"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { authFormSchema } from "@/constants/AuthFormSchema"
import { toast } from "sonner"
import FormField from "./FormField"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "@/firebase/client"
import { signUp, signIn } from "@/lib/actions/auth.action"


export default function AuthForm({ type }: { type: FormType }) {

    const auth = getAuth(app)
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values
                console.log("sign-up", values)
                const userCreditentials = await createUserWithEmailAndPassword(auth, email, password)
                const result = await signUp({ uid: userCreditentials.user.uid, name: name!, email, password })

                if (!result?.success) toast.error(result?.message)
                else toast.success("Account created successfully, Please Sign In")
                toast.success("Account created successfully")
                router.push("/sign-in")
            } else {
                const { email, password } = values
                console.log("sign-in", values)

                const userCreditentials = await signInWithEmailAndPassword(auth, email, password)
                const idToken = await userCreditentials.user.getIdToken()
                if (!idToken) { toast.error("SignIn failed"); return }

                const result = await signIn({ email, idToken })
                if (!result?.success) toast.error(result?.message)

                toast.success("Signed in successfully")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`An error occurred : ${error}`)
        }
    }

    const isSignIn = type === "sign-in"

    useEffect(() => { setMounted(true) })
    if (!mounted) return null

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card px-10 py-14">
                <div className="flex justify-center gap-2">
                    <Image src="/logo.svg" width={40} height={40} alt="logo" />
                    <h2 className="text-primary-100">TYI - take your interview</h2>
                </div>
                <h3 className="text-center">Practice your job interview skills with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 form mt-4 w-full">
                        {!isSignIn && (
                            <FormField control={form.control} name="name" placeholder="John Doe" label="Name" />
                        )}
                        <FormField control={form.control} name="email" placeholder="Email" label="Email" type="email" />
                        <FormField control={form.control} name="password" placeholder="Password" label="Password" type="password" />
                        <Button type="submit" className="btn">{isSignIn ? "Sign In" : "Create an account"}</Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <Link className="font-bold text-user-primary ml-1" href={!isSignIn ? "/sign-in" : "/sign-up"}>{!isSignIn ? "Sign In" : "Sign Up"}</Link>
                </p>

            </div>
        </div>
    )
}

// Removed the placeholder function as the actual Firebase method is being used.
