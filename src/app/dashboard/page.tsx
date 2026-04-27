"use client";
import { UserContext } from "@/context/user-context"
import { useContext } from "react"

export default function Dashboard() {
    const ctx = useContext(UserContext)
    return (
        <div className="flex min-h-svh w-full flex-1 items-center justify-center">
            <div className="flex w-full flex-col items-center text-center">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="mt-4 text-lg">Welcome to your dashboard! {ctx?.user?.email}</p>
            </div>
        </div>
    )
}