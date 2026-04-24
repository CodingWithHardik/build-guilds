"use client";

import { createContext } from "react";

type UserData = {
    name: string;
    email: string;
}
export const UserContext = createContext<UserData | null>(null);

export function UserProvider({ children, value }: { children: React.ReactNode; value: UserData }) {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}