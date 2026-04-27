"use client";

import { createContext, useState } from "react";

type UserData = {
    name: string;
    email: string;
}

type UserContextType = {
    user: UserData | null,
    setUser: (data: UserData) => void
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children, value }: { children: React.ReactNode; value: UserData }) {
    const [user, setUser] = useState<UserData | null>(value);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}