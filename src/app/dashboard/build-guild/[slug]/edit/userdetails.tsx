"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sanitizeHref, sanitizeInput } from "@/lib/functions/sanitization";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UnlockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function UserDetails() {
  const [data, setData] = useState({
    name: "",
    date: "",
    location: "",
    venue: "",
    signuplink: "",
    slackChannel: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [datepopupOpen1, setDatePopupOpen1] = useState(false);
  const handleSubmit = async () => {
    localStorage.setItem("previewDetails", JSON.stringify(data));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    const storedDetails = localStorage.getItem("previewDetails");
    if (storedDetails) {
      const parseStorage = JSON.parse(storedDetails);
      setData({
        name: sanitizeInput(parseStorage.name),
        date: new Date(parseStorage.date).toString(),
        location: sanitizeInput(parseStorage.location),
        venue: sanitizeInput(parseStorage.venue),
        signuplink: sanitizeHref(parseStorage.signuplink, { onlyEndWithHref: false, fallback: "https://buildguild.tech" }),
        slackChannel: sanitizeInput(parseStorage.slackChannel),
      });
    }
  }, []);
  const formatDate = (date: string) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return format(d, "PPP");
  };
  return (
    <>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Name
        </Label>
        <div className="relative w-full">
          <Input
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            value={data.name}
            onChange={(e) => setData({ ...data, name: sanitizeInput(e.target.value) })}
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Date
        </Label>
        <div className="relative w-full">
          <Popover onOpenChange={setDatePopupOpen1} open={datepopupOpen1}>
            <PopoverTrigger
              render={
                <Button className="justify-start w-full rounded-md border bg-[#0b3869]/50 text-gray-400 border-[#0b3869] hover:bg-[#0b3869]/50">
                  {formatDate(data.date) ?? <span>Pick a start date</span>}
                </Button>
              }
              nativeButton={true}
            />
            <PopoverContent className="w-auto p-0 mx-auto bg-[#0b3869] rounded-md">
              <Calendar
                mode="single"
                selected={
                  data.date && !isNaN(new Date(data.date).getTime())
                    ? new Date(data.date)
                    : undefined
                }
                defaultMonth={
                  data.date && !isNaN(new Date(data.date).getTime())
                    ? new Date(data.date)
                    : new Date()
                }
                onSelect={(date: any) => {
                  setData({ ...data, date: new Date(date).toISOString() });
                  setDatePopupOpen1(false);
                }}
                className={cn("p-3 bg-[#0b3869] rounded-lg")}
                classNames={{
                  caption_label: "text-sm font-medium text-bp-warning-darker",
                  weekday:
                    "text-bp-warning-darker rounded-md w-9 font-normal text-[0.8rem]",
                  day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 font-normal text-bp-warning ring-0 border-none",
                    "[&_button[data-selected-single='true']]:bg-bp-warning-darker [&_button[data-selected-single='true']]:text-[#0b3869]",
                    "[&_button:hover]:bg-bp-warning/60 [&_button:hover]:text-[#0b3869] hover:bg-bp-warning/60",
                  ),
                  outside: "text-bp-warning-darker",
                  today: "bg-[#0b3869] text-bp-warning",
                  button_next: "text-bp-warning-darker",
                  button_previous: "text-bp-warning-darker",
                }}
              />
            </PopoverContent>
          </Popover>
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Location
        </Label>
        <div className="relative w-full">
          <Input
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            value={data.location}
            onChange={(e) => setData({ ...data, location: sanitizeInput(e.target.value) })}
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Venue
        </Label>
        <div className="relative w-full">
          <Input
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            value={data.venue}
            onChange={(e) => setData({ ...data, venue: sanitizeInput(e.target.value) })}
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          SignUp Link
        </Label>
        <div className="relative w-full">
          <Input
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            value={data.signuplink}
            onChange={(e) => setData({ ...data, signuplink: sanitizeHref(e.target.value, {fallback: "https://buildguild.tech", onlyEndWithHref: false}) })}
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          SlackChannel
        </Label>
        <div className="relative w-full">
          <Input
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
            value={data.slackChannel}
            onChange={(e) => setData({ ...data, slackChannel: sanitizeInput(e.target.value) })}
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        {success && (
          <p className="text-green-400 mt-2 text-center">
            Details updated successfully!
          </p>
        )}
      </div>
      <div className="mt-8 flex justify-end gap-4">
        <button
          className="rounded-md bg-[#0b3869] hover:bg-[#0b3869]/80 text-white px-4 py-2"
          onClick={() => {
            redirect("/template/build-guild/preview");
          }}
        >
          View Website
        </button>
        <button
          className="rounded-md bg-[#0b3869] hover:bg-[#0b3869]/80 text-white px-4 py-2"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
