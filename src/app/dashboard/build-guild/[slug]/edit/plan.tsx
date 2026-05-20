"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react";
import { UnlockIcon } from "lucide-react";
import { useState } from "react";

export default function Plan() {
    const [data, setData] = useState({
        time: "",
        title: "",
        description: "",
      });
  return (
    <div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Time
        </Label>
        <div className="relative w-full">
          <Input
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Schedule Title
        </Label>
        <div className="relative w-full">
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      <div className="mt-4">
        <Label className="block font-bold text-bp-warning mb-2.5 text-sm tracking-widest font-rcfull ">
          Schedule Description
        </Label>
        <div className="relative w-full">
          <Input
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full bg-[#0b3869]/50 text-gray-400 border border-[#0b3869] rounded-md pr-10 p-2 px-4"
          />
          <UnlockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}