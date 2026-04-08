"use client";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { redirect } from 'next/navigation'

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOTP] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isSecondStep, setIsSecondStep] = React.useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");
    if (!isSecondStep) {
      try {
        const responseAPI = await fetch("/api/auth/requestOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (responseAPI.status === 429)
        return setError("Too many requests. Please try again later.");
      if (responseAPI.status === 229)
        return setError(
          "Too many OTP requests. Please try again after 24 hours.",
        );
      if (responseAPI.status === 400) return setError("No email provided");
      if (responseAPI.status === 200)
        return setError(
          "Invalid Email Address. Please use your blueprint email.",
        );
      if (responseAPI.status === 202) {
        setIsSecondStep(true);
        setError("");
        setSuccess("OTP sent successfully.");
        setIsLoading(false);
      }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (otp.length !== 6) {
        setError("Invalid OTP");
        setIsLoading(false);
        return;
      }
      const responseAPI = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const response = await responseAPI.json();
      if (responseAPI.status === 429) {
        setOTP("");
        setError("Too many requests. Please try again later.");
        setIsLoading(false);
        return;
      }
      if (responseAPI.status === 200) {
        setOTP("");
        setIsLoading(false) 
        setError(response.error);
        return;
      }
      if (responseAPI.status === 500) {
        setOTP("");
        setIsLoading(false)
        setError("Internal Server Error")
        return;
      };
      if (responseAPI.status === 202) {
        setError("");
        setSuccess("Logged in successfully. Redirecting...");
        redirect("/");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-[#0F2B52]">
      <div className="w-full h-screen relative">
        <ShapeGrid
          speed={0}
          squareSize={55}
          borderColor="#4677a9"
          hoverFillColor="#264065"
          hoverTrailAmount={0}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <Card className="inline-block h-fit bg-[#071d35] w-96">
          <CardHeader className="p-4 space-y-1">
            <div>
              <Image
                src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/logo.png?raw=true"
                alt="Logo"
                width={240}
                height={240}
                loading="eager"
                className="mx-auto mb-2 w-auto h-auto"
              />
              <CardTitle className="text-2xl text-white font-bold">
                Organizers Portal
              </CardTitle>
              <CardDescription className="text-sm text-gray-400 px-4 py-1">
                Access the Build Guilds organizers portal to manage your event
                website
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <form onSubmit={onSubmit} id="login">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 ">
                  <Label htmlFor="email" className="text-white">
                    Email<label className="text-red-500">*</label>
                  </Label>
                  <div className="flex items-center border border-gray-600 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <Input
                      id="email"
                      type="text"
                      placeholder="city"
                      onChange={(e) =>
                        setEmail(`${e.target.value}@blueprint.hackclub.com`)
                      }
                      required
                      maxLength={30}
                      className="bg-[#071d35]/10 text-white placeholder:text-gray-500 border-0 focus-visible:ring-0 focus:ring-offset-0 rounded-none flex-1 min-w-0"
                    />
                    <span className="text-white px-3 py-2 text-xs whitespace-nowrap select-none">
                      @blueprint.hackclub.com
                    </span>
                  </div>
                </div>
                {isSecondStep && (
                  <div className="grid gap-2 ">
                    <Label htmlFor="email" className="text-white">
                      OTP<label className="text-red-500">*</label>
                    </Label>
                    <Input
                      id="text"
                      type="text"
                      placeholder="AB321E"
                      value={otp}
                      onPaste={(e) => {
                        
                        const pasted = e.clipboardData.getData("text");
                        let value = pasted.replace(/\s/g, "").toUpperCase().slice(0,6)
                        setOTP(value)
                        setTimeout(() => {
                          e.preventDefault();
                        },0)
                      }}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, "").toUpperCase();
                        value = value.slice(0, 6);
                        setOTP(value);
                      }}
                      required
                      maxLength={12}
                      className="bg-[#071d35]/10 text-white placeholder:text-gray-500 flex-1 min-w-0 border border-gray-600 rounded-md focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus:ring-offset-0 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </form>
            {error && <p className="text-red-600 text-left py-2">{error}</p>}
            {success && (
              <p className="text-green-600 text-left py-2">{success}</p>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              type="submit"
              className="w-full bg-[#175ffd] hover:bg-[#175ffd]/60 text-white"
              disabled={isLoading}
              form="login"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
