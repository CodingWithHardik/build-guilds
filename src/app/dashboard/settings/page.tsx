"use client";
import { UserContext } from "@/context/user-context";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import config from "../../../../config.json";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react";
import { LockIcon, UnlockIcon } from "lucide-react";

export default function SettingsPage() {
  const ctx = useContext(UserContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [name, setName] = useState<string>(ctx?.user?.name || "");
  const [savedetails, setSaveDetails] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<string>("");
  const [detailsSuccess, setDetailsSuccess] = useState<boolean>(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSuccess(false);
    setIsDisabled(true);
    if (!file) {
      setIsDisabled(false);
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("File size exceeds 3MB limit.");
      setIsDisabled(false);
      return;
    }
    const formData = new FormData();
    formData.append(`file`, file);
    const res = await fetch("/api/user/uploadAvatar", {
      method: "POST",
      body: formData,
    });
    if (!res.ok || res.status === 401) {
      setError("Failed to upload avatar.");
    }
    if (res.status === 400) {
      const data = await res.json();
      setError(data.error || "Failed to upload avatar.");
    }
    if (res.status === 200) {
      const data = await res.json();
      setSuccess(true);
      ctx?.setUser({
        avatar: data.avatarUrl,
        email: ctx.user?.email || "",
        name: ctx.user?.name || "",
      });
    }
    setIsDisabled(false);
    setTimeout(() => {
      setSuccess(false);
    }, 3000)
  };
  const handleSaveDetails = async () => {
    setDetailsSuccess(false)
    setSaveDetails(true);
    if (ctx?.user?.name === name) {
      setSaveDetails(false);
      return;
    }
    const res = await fetch("/api/user/setName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
    if (!res.ok || res.status === 401) {
      setDetailsError("Failed to update name.");
    }
    if (res.status === 400) {
      const data = await res.json();
      setDetailsError(data.error || "Failed to update name.");
    }
    if (res.status === 200) {
      ctx?.setUser({
        avatar: ctx.user?.avatar || "",
        email: ctx.user?.email || "",
        name,
      });
      setSaveDetails(false);
      setDetailsSuccess(true);
      setTimeout(() => {
        setDetailsSuccess(false);
      }, 3000)
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-7xl font-bold text-white p-4 text-center font-rcfull bg-[#071930] rounded-lg">
        Settings
      </h1>
      <div className="bg-[#071930] rounded-lg p-4 my-8">
        <div className="md:grid-cols-2 grid-cols-1 hidden md:grid">
          <div className="p-4 flex justify-center items-center flex-col">
            <img
              src={ctx?.user?.avatar || config.defaultAvatar}
              alt="Profile Avatar Placeholder"
              width={250}
              height={250}
              className="rounded-lg mx-auto mb-4 aspect-square border-2 border-[#0b3869]"
              loading="eager"
            />
            <input
              type="file"
              ref={avatarRef}
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleUpload}
            />
            <Button
              className="rounded-md bg-[#0b3869] hover:bg-[#0b3869]/80"
              onClick={() => avatarRef.current?.click()}
              disabled={isDisabled}
            >
              Change Avatar
            </Button>
            {error?.length > 0 && (
              <p className="text-red-400 mt-2 text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-400 mt-2 text-center">
                Avatar updated successfully!
              </p>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-9xl font-bold text-bp-warning mb-4 text-right font-rcfull">
              Profile Avatar
            </h2>
            <p className="text-gray-400 mb-4 text-center">
              Update your profile picture to personalize your account.
            </p>
          </div>
        </div>
        <div className="md:grid-cols-2 grid-cols-1 md:hidden grid">
          <div className="p-4">
            <h2 className="text-5xl font-bold text-bp-warning mb-4 text-center font-rcfull">
              Profile Avatar
            </h2>
            <p className="text-gray-400 mb-4 text-center">
              Update your profile picture to personalize your account.
            </p>
          </div>
          <div className="p-4 flex justify-center items-center flex-col">
            <img
              src={ctx?.user?.avatar || config.defaultAvatar}
              alt="Profile Avatar Placeholder"
              width={250}
              height={250}
              className="rounded-lg mx-auto mb-4 aspect-square border-2 border-[#0b3869]"
              loading="eager"
            />
            <input
              type="file"
              ref={avatarRef}
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleUpload}
            />
            <Button
              className="rounded-md bg-[#0b3869] hover:bg-[#0b3869]/80"
              onClick={() => avatarRef.current?.click()}
              disabled={isDisabled}
            >
              Change Avatar
            </Button>
            {error?.length > 0 && (
              <p className="text-red-400 mt-2 text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-400 mt-2 text-center">
                Avatar updated successfully!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#071930] rounded-lg p-8 my-8 w-full">
        <div>
          <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
            Name
          </Label>
          <div className="relative w-full">
            <Input
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            />
            <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <div className="mt-8">
          <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
            Email
          </Label>
          <div className="relative w-full">
            <Input
              value={ctx?.user?.email || ""}
              disabled
              className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 cursor-not-allowed p-2 px-4"
            />
            <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <div className="mt-4">
          {detailsError?.length > 0 && (
            <p className="text-red-400 mt-2 text-left">{detailsError}</p>
          )}
          {detailsSuccess && (
            <p className="text-green-400 mt-2 text-left">
              Details updated successfully!
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            className="rounded-md bg-[#0b3869] hover:bg-[#0b3869]/80"
            disabled={savedetails}
            onClick={handleSaveDetails}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
