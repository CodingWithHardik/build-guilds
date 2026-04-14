import { useEffect, useState } from "react";

export default function Timer() {
  const DATE = new Date("2026-04-19T00:00:00Z").getTime();
  const [timeleft, settimeleft] = useState(getTime());
  const [mounted, setMounted] = useState(false);
  function getTime() {
    const difference = DATE - Date.now();
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => settimeleft(getTime()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!mounted) return null;
  return (
    <div className="w-full bg-[#071d35] border-[#2E4A6F] border flex justify-center">
      <div className="flex flex-wrap items-center justify-center max-w-6xl px-4 py-6">
        <h2 className="text-white font-bold mt-4 text-xl">
          Lock in before April 19th, 2026!
        </h2>
        <div className="w-full text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-14 p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center h-24 w-24 md:w-32 md:h-32 bg-background bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-size-[40px_40px]">
                <div className="absolute top-0 -left-5 -right-8 h-px bg-white/50"></div>
                <div className="absolute bottom-0 -left-6 -right-3 h-px bg-white/50"></div>
                <div className="absolute left-0 -top-4 -bottom-7 w-px bg-white/50"></div>
                <div className="absolute right-0 -top-3 -bottom-6 w-px bg-white/50"></div>
                <span className="text-5xl md:text-6xl font-medium text-white tabular-nums font-rcfull">
                  {timeleft.days}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-white/90">
                Days
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center h-24 w-24 md:w-32 md:h-32 bg-background bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-size-[40px_40px]">
                <div className="absolute top-0 -left-6 -right-4 h-px bg-white/50"></div>
                <div className="absolute bottom-0 -left-8 -right-7 h-px bg-white/50"></div>
                <div className="absolute left-0 -top-4 -bottom-3 w-px bg-white/50"></div>
                <div className="absolute right-0 -top-6 -bottom-4 w-px bg-white/50"></div>
                <span className="text-5xl md:text-6xl font-medium text-white tabular-nums font-rcfull">
                  {timeleft.hours}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-white/90">
                Hours
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center h-24 w-24 md:w-32 md:h-32 bg-background bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-size-[40px_40px]">
                <div className="absolute top-0 -left-5 -right-6 h-px bg-white/50"></div>
                <div className="absolute bottom-0 -left-7 -right-4 h-px bg-white/50"></div>
                <div className="absolute left-0 -top-6 -bottom-4 w-px bg-white/50"></div>
                <div className="absolute right-0 -top-3 -bottom-8 w-px bg-white/50"></div>
                <span className="text-5xl md:text-6xl font-medium text-white tabular-nums font-rcfull">
                  {timeleft.minutes}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-white/90">
                minutes
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center h-24 w-24 md:w-32 md:h-32 bg-background bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-size-[40px_40px]">
                <div className="absolute top-0 -left-8 -right-4 h-px bg-white/50"></div>
                <div className="absolute bottom-0 -left-4 -right-8 h-px bg-white/50"></div>
                <div className="absolute left-0 -top-3 -bottom-8 w-px bg-white/50"></div>
                <div className="absolute right-0 -top-6 -bottom-6 w-px bg-white/50"></div>
                <span className="text-5xl md:text-6xl font-medium text-white tabular-nums font-rcfull">
                  {timeleft.seconds}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-white/90">
                seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
