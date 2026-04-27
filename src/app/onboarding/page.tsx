"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/user-context";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Onboarding() { 
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const ctx = useContext(UserContext);
    const router = useRouter()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (name.length < 3) {
            setLoading(false);
            setError("Name must be at least 3 characters long.");
            return;
        }
        const res = await fetch("/api/user/onboarding", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ctx?.user?.email}`
            },
            body: JSON.stringify({ name }),
        })
        if (!res.ok || res.status === 500) {
            setLoading(false);
            setError("Internal Server Error. Please try again.");
            return;
        }
        const data = await res.json();
        if (data.status === 401) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
            return;
        } 
        if (data.status === 400) {
            setLoading(false);
            setError("You are already onboarded.");
            return;
        }
        const email = ctx?.user?.email;
        if (!email) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
            return;
        };
        ctx.setUser({ name: name, email: email });
        router.push("/");
    }
    return (
        <div className="flex h-screen w-screen items-center justify-center font-rcfull text-white">
            <Card className="w-full max-w-sm py-4 text-center bg-[#071d35] ">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold font-rcfull text-white">Onboarding</CardTitle>
                    <CardDescription className="text-gray-200 text-sm">
                        Welcome to Build Guild Website Studio!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="onboarding" onSubmit={onSubmit}>
                        <div className="flex w-full flex-col">
                        <Label className="mb-2 mt-4 text-left text-sm font-medium text-white">Name</Label>
                        <Input 
                            type="text" 
                            placeholder="Your name" 
                            className="w-full rounded-md border border-gray-500 px-3 py-2 focus:outline-none bg-white/10 placeholder:text-white text-white" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    </form>
                    {error.length > 0 && (
                        <p className="text-red-500 text-sm text-left pt-2">{error}</p>
                    )}
                </CardContent>
                <CardFooter className="">
                    <Button 
                        type="submit" 
                        className="w-full rounded-lg bg-[#175ffd] hover:bg-[#175ffd]/60 text-white" 
                        form="onboarding" 
                        disabled={loading}
                    >
                        Continue <ArrowRight className="ml-2" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}   