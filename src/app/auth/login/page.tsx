"use client";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/user-context";
import { sanitizeHref, sanitizeInput } from "@/lib/functions/sanitization";

export default function Login() {
  const ctx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSecondStep, setIsSecondStep] = useState(false);
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
          body: JSON.stringify({ email: sanitizeInput(email, { lowercase: true }) }),
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
        body: JSON.stringify({ email: sanitizeInput(email, { lowercase: true }), otp: sanitizeInput(otp, {lowercase: true, maxLength: 6}).toUpperCase() }),
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
        setIsLoading(false);
        setError(sanitizeInput(response.error));
        return;
      }
      if (responseAPI.status === 500) {
        setOTP("");
        setIsLoading(false);
        setError("Internal Server Error");
        return;
      }
      if (responseAPI.status === 202) {
        setError("");
        setSuccess("Logged in successfully. Redirecting...");
        ctx?.setUser({
          name: sanitizeInput(response.name),
          email: sanitizeInput(response.email, { lowercase: true }),
          avatar: sanitizeHref(response.avatar, { fallback: "https://cdn.hackclub.com/019dde90-52b7-7dcc-8e6a-cf679d66a4aa/Untitled%20design-5.png", onlyEndWithHref: false, allowedDomain: "cdn.hackclub.com" }),
        });
        if (!response.isNew) {
          const csrf = responseAPI.headers.get("x-csrf-token") || "";
          const eventresponse = await fetch("/api/events/getEvents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-csrf-token": csrf
            },
          });
          const eventData = await eventresponse.json();
          const data = eventData.map((event: any, index: number) => ({
            eventId: event.id,
            eventName: sanitizeInput(event.eventName),
            eventslug: sanitizeInput(event.slug, { lowercase: true }),
            description: sanitizeInput(event.description, { preserveNewLines: true }),
            logo: sanitizeHref(event.logo, { fallback: "https://cdn.hackclub.com/019ddd5e-2595-7627-a954-bcf0336fc9c6/Untitled%20design-2.png", onlyEndWithHref: false, allowedDomain: "cdn.hackclub.com" }),
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
          }));
          ctx?.setEvents(data);
        }
        localStorage.clear()
        if (response.isNew) window.location.assign("/onboarding");
        else window.location.assign("/");
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full px-4">
        <Card className="w-full sm:max-w-sm h-fit bg-[#071d35] mx-auto">
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
                      placeholder="hardik@example.com"
                      onChange={(e) => setEmail(sanitizeInput(e.target.value, {lowercase: true}))}
                      required
                      maxLength={30}
                      className="bg-[#071d35]/10 text-white placeholder:text-gray-500 border-0 focus-visible:ring-0 focus:ring-offset-0 rounded-none flex-1 min-w-0"
                    />
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
                        let value = pasted
                          .replace(/\s/g, "")
                          .toUpperCase()
                          .slice(0, 6);
                        setOTP(sanitizeInput(value, {lowercase: true, maxLength: 6}).toUpperCase());
                        setTimeout(() => {
                          e.preventDefault();
                        }, 0);
                      }}
                      onChange={(e) => {
                        let value = e.target.value
                          .replace(/\s/g, "")
                          .toUpperCase();
                        value = value.slice(0, 6);
                        setOTP(sanitizeInput(value, {lowercase: true, maxLength: 6}).toUpperCase());
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
