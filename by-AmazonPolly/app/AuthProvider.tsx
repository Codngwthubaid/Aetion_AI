import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {

    const user = useUser();
    const createUser = useMutation(api.users.CreateUser)
    useEffect(() => { console.log(user); user && createNewUser() }, [user])

    const createNewUser = async () => {
        const result = await createUser({
            name: user?.displayName as string,
            email: user?.primaryEmail as string
        })
        console.log(result)
    }

    return (
        <div>{children}</div>
    )
}

export default AuthProvider