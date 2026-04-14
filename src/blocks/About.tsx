"use client";

export default function About() {
  return (
    <>
        <div className="relative overflow-hidden px-6 md:px-14 py-16 md:py-24 font-rcbasic">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start max-w-7xl mx-auto">
          <div className="pl-4 md:pl-18 pt-0 md:pt-2">
            <div className="mb-10 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bp-warning">
                About Build Guild
              </span>
            </div>
            <h2 className="font-rcfull font-black uppercase leading-[0.95] tracking-[-0.04em] text-[42px] sm:text-[52px] md:text-[58px] lg:text-[68px] xl:text-[78px]">
                <span className="text-white md:block inline font-rcempty">Build </span>
                <span className="text-white md:block inline font-rcempty">Stuff. </span>
            </h2>
            <h2 className="font-rcfull font-black uppercase leading-[0.95] tracking-[-0.04em] text-[42px] sm:text-[52px] md:text-[58px] lg:text-[68px] xl:text-[78px]">
                <span className="text-bp-warning-darker md:block inline">Meet </span>
                <span className="text-white md:block inline">Your </span>
                <span className="text-white md:block inline">People </span>
            </h2>
            <p className="mt-6 md:mt-8 max-w-65 text-[13px] font-light italic leading-relaxed tracking-wide text-gray-400 font-sans">
                A global gathering of teen hardware builders, one day, every city, no cost.
            </p>
          </div>
          <div className="pt-0 md:pt-2">
            <p className="mb-10 md:mb-12 pl-5 md:pl-7 text-[14px] md:text-[18px] font-rcfull leading-[1.9] text-white ">
                Build Guild is a one-day, free in-person event running globally
            across two weeks, <span className="font-bold text-bp-warning">April 13-26, 2026.</span> Teen builders gather in their
            cities to work on hardware projects, dive into hands-on workshops
            covering soldering, breadboards, and guided builds, show off their
            work at project demos, share ideas through lightning talks, and
            spend open build time just making things alongside fellow makers.
            </p>
            <div className="grid grid-cols-2 border border-white/90 bg-[#071d35] ">
                <div className="relative p-5 md:p-7 border-r border-white/90 border-b">
                    <span className="absolute top-4 right-4 h-1 w-1 rounded-full bg-bp-warning"/>
                    <p className="text-[28px] md:text-[38px] font-black leading-none tracking-[-0.04em] text-bp-warning">April 13</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Kick-off date</p>
                    <p className="mt-1 text-[12px] font-light leading-relaxed text-white/80">Running through April 26</p>
                </div>
                <div className="relative p-5 md:p-7 border-b border-white/90">
                    <span className="absolute top-4 right-4 h-1 w-1 rounded-full bg-bp-warning"/>
                    <p className="text-[28px] md:text-[38px] font-black leading-none tracking-[-0.04em] text-bp-warning">Free</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Cost to attend</p>
                    <p className="mt-1 text-[12px] font-light leading-relaxed text-white/80">No tickets, no fees</p>
                </div>
                <div className="relative p-5 md:p-7 border-r border-white/90">
                    <span className="absolute top-4 right-4 h-1 w-1 rounded-full bg-bp-warning"/>
                    <p className="text-[28px] md:text-[38px] font-black leading-none tracking-[-0.04em] text-bp-warning">1 Day</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Format</p>
                    <p className="mt-1 text-[12px] font-light leading-relaxed text-white/80">In-person, per city</p>
                </div>
                <div className="relative p-5 md:p-7 border-b border-white/90">
                    <span className="absolute top-4 right-4 h-1 w-1 rounded-full bg-bp-warning"/>
                    <p className="text-[28px] md:text-[38px] font-black leading-none tracking-[-0.04em] text-bp-warning">Global</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Reach</p>
                    <p className="mt-1 text-[12px] font-light leading-relaxed text-white/80">Cities worldwide</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
