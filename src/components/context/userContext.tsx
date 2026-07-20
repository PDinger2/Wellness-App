import { useState, useEffect, createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

const userContext = createContext(null);

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({data}) => {
            setUser(data.user)

        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            },
        );

        return () => subscription.unsubscribe()
    }, [])

    let contextData = { user, setUser }
    return (
        <userContext.Provider value={contextData}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserProvider }