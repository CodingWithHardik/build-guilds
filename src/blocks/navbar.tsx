"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar({ signUp }: { signUp: string }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-colors bg-[#071d35] text-white"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center md:hidden">
            <div className="flex items-center">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <span className="sr-only">
                  {open ? "Close sidebar" : "Open sidebar"}
                </span>
                <div className="relative h-6 w-6" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute left-0 right-0 top-1 block h-0.5 w-6 origin-center rounded transition-all duration-200",
                      open ? "top-2 rotate-45" : "",
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                  <span
                    className={cn(
                      "absolute left-0 right-0 top-2 block h-0.5 w-6 origin-center rounded transition-all duration-200",
                      open ? "opacity-0" : "opacity-100",
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                  <span
                    className={cn(
                      "absolute left-0 right-0 top-3 block h-0.5 w-6 origin-center rounded transition-all duration-200",
                      open ? "top-2 -rotate-45" : "",
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                </div>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <div aria-hidden className="flex items-center justify-end" />
          </div>
          <div className="hidden h-20 items-center md:grid md:grid-cols-[200px_1fr_auto] md:gap-x-10">
            <div className="flex items-center justify-center pl-32">
              <Logo />
            </div>
            <nav className="flex items-center justify-center">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-base transition-colors hover:opacity-80 font-bold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-end pr-32">
              <Link href={signUp} aria-label="Sign Up">
                <Button className="h-11 px-6 text-base bg-bp-warning-darker hover:bg-bp-warning font-bold rounded-none text-[#071d35] btn-grain">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="h-20" aria-hidden />

      {open ? (
        <div
          className="fixed inset-x-0 top-20 bottom-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            className={cn(
              "absolute left-0 top-0 bottom-0 w-screen translate-x-0 bg-card/80 text-card-foreground backdrop-blur-xl shadow-xl ring-1 overflow-y-auto",
              "animate-in slide-in-from-left duration-200",
              "backdrop-blur-md bg-[#071d35]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-4 pb-4 pt-4 flex flex-col items-center">
              <ul className="flex flex-col items-center gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-white hover:bg-bp-warning-darker hover:text-background font-bold text-center btn-grain"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-2 flex justify-center w-full">
                <Button className="h-11 px-6 text-base bg-bp-warning-darker hover:bg-bp-warning font-bold rounded-none text-[#071d35] btn-grain">
                  <Link
                    href={signUp}
                    onClick={() => setOpen(false)}
                    aria-label="Sign Up"
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="text-balance text-lg font-semibold tracking-tight hover:opacity-90 shrink-0"
      aria-label="Go to homepage"
    >
      <Image
        src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/logo.png?raw=true"
        width={160}
        height={80}
        alt="Blueprint logo"
        className="w-auto"
        loading="eager"
      />
    </Link>
  );
}
