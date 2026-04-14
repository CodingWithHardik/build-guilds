"use client";
import Image from "next/image";
import Navbar from "@/blocks/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Nunito } from "next/font/google";
import Sponsors from "@/blocks/sponsors";
import Timer from "@/blocks/Timer";
import About from "@/blocks/About";
import Timeline from "@/blocks/timeline";
import BlueprintGallery from "@/blocks/Gallery";
import Team from "@/blocks/Team";
import { Faq } from "@/blocks/Faq";
import { Badge } from "@/components/ui/badge";
import { Calendar1Icon, CheckCircle2Icon, StarIcon } from "lucide-react";
import { Footer } from "@/blocks/Footer";

const nunito = Nunito({ subsets: ["latin"], weight: ["700"] });

export default function CityPage() {
  return (
    <>
      <Navbar />
      <div className="text-center mt-4">
        <Image
          src="https://raw.githubusercontent.com/CodingWithHardik/assets/refs/heads/main/build-guilds/logo_main.png"
          alt="Logo"
          width={400}
          height={100}
          loading="eager"
        className="mx-auto"
        />
        <p className="text-sm md:text-base tracking-widest text-gray-200 uppercase p-1">
          Hack Club Blueprint Presents
        </p>
        <h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold pt-2 text-white",
            "font-rcfull",
          )}
        >
          Build Guild
          <br />
          <span className="text-bp-warning uppercase">Kanpur</span>
        </h1>
        <p className="max-w-175 mx-auto text-base md:text-lg text-gray-200 pt-2 font-rcfull">
          The world's largest week of hardware meetups coming to your city. Join
          or start a guild, April 13 to 19th.
        </p>
        <Button className="mt-4 px-6 text-lg bg-bp-warning hover:bg-bp-warning-darkere font-bold rounded-none text-[#071d35] btn-grain">
          <a href="https://example.com" aria-label="Sign Up">
            Sign Up
          </a>
        </Button>
        <div className="flex items-center justify-center m-8">
          <div className="border border-[#2E4A6F] grid grid-cols-1 md:grid-cols-3 w-full max-w-3xl bg-[#071d35]">
            <div className="p-4 border-b md:border-b-0 md:border-r border-[#2E4A6F] text-center">
              <p className="text-gray-400 text-xs tracking-widest font-semibold">
                EVENT WINDOW
              </p>
              <h2 className="text-yellow-400 text-lg font-bold mt-1">
                April 19
              </h2>
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-[#2E4A6F] text-center">
              <p className="text-gray-400 text-xs tracking-widest font-semibold">
                LOCATION
              </p>
              <h2 className="text-white text-lg font-bold mt-1">
                Kanpur, India
              </h2>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-400 text-xs tracking-widest font-semibold">
                VENUE
              </p>
              <h2 className="text-white text-sm md:text-lg font-bold mt-1 leading-snug">
                TBD
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Timer />
      <About />
      <Timeline />
      <Sponsors />
      <BlueprintGallery />
      <Team />
      <Faq />
      <div className="container mx-auto py-8 my-12 px-6 md:px-14 max-w-7xl">
        <div className="px-6 md:px-14 bg-[#071d35] py-6 md:py-8">
          <h4 className="text-4xl text-bp-warning font-rcfull font-bold">Ready to build something real?</h4>
        <p className="text-2xl">One day. Hands on tools. Zero fluff.</p>
        <div className="my-2 flex flex-wrap gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Calendar1Icon className="inline-block mr-2" />
            Full-day workshop
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
           <StarIcon className="inline-block mr-2" />
           Components provided
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <CheckCircle2Icon className="inline-block mr-2" />
            100% free
          </Badge> 
        </div>
        <p className="mt-8 text-gray-200">
          Whether you're chasing your first PCB layout, your first firmware flash, or finally turning that idea into a working prototype this is the day to make it happen.
        </p>
        <p className="mt-4 text-gray-400">
          Bench time, real components, and a room full of people who've been exactly where you are.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button className="px-6 text-lg bg-bp-warning hover:bg-bp-warning-darkere font-bold rounded-none text-[#071d35] btn-grain">
            <a href="https://example.com" aria-label="Sign Up">
              Sign Up
            </a>
          </Button>
          <Button variant="outline" className="px-6 text-lg font-bold rounded-none text-gray-200 hover:bg-image-contrast/10">
            <a href="https://example.com" aria-label="Learn More">
              Learn More
            </a>
          </Button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}