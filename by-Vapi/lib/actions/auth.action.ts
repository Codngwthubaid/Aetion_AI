"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7

export async function signUp(params: SignUpParams) {

    const { uid, name, email } = params

    try {
        console.log(params);
        const userDetails = await db.collection("users").doc(uid).get()
        if (userDetails.exists) return { success: false, message: "User already exists" }
        await db.collection("users").doc(uid).set({ name, email })
        return {success : true, message : "Account created successfully, Please Sign In"}

    } catch (error: any) {
        console.log("Error creating a user", error)
        if (error.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "Email already exists"
            }
        }

        return {
            success: false,
            message: "Error creating a user"
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params

    try {
        const userRecord = await auth.getUserByEmail(email)
        if(!userRecord) return {success : false, message : "User does not exist, please sign up"}
        else await setSessionCookie(idToken)
        return {
            success: true,
            message: "Signed in successfully"
        }
    }
    catch (error: any) {
        console.log("Error creating a user", error)
        return {
            success: false,
            message: "Error creating a user"
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000 })
    cookieStore.set("session", sessionCookie, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "lax",
        maxAge: ONE_WEEK,
    })
}