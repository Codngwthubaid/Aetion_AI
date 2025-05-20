"use client"
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { supabase } from "@/services/supabaseClient";
import { useContext, useEffect, useState } from "react";
import type { UserType } from "@/types/index";

export default function Provider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<UserType>()
    useEffect(() => { createNewUser() }, [])

    const createNewUser = () => {
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email)

            console.log(Users);

            if (Users?.length == 0) {
                const { data, error } = await supabase.from('Users').insert(
                    [
                        {
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture
                        }
                    ]
                )
                console.log(data);
                setUser(data?.[0])
                return;
            }
            if (Users) { setUser(Users[0]) }
        })
    }

    return (
        <UserDetailsContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailsContext.Provider>
    );
}

export const useUser = () => { return useContext(UserDetailsContext) }