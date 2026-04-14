"use client";

export default function Timeline() {
  const timelineEvents = [
    {
      time: "11:00 AM - 11:30 AM",
      title: "Check-in + Bench Setup",
      description:
        "Arrive at your local event space, check in with the organizers, and set up your workspace for the day.",
    },
    {
      time: "April 19, 2026",
      title: "Event Window Closes",
      description:
        "Last chance to attend your local Build Guild event and share your projects with the community.",
    },
  ];
  return (
    <div className="w-full bg-[#071d35]">
<div className="container mx-auto px-6 md:px-14 max-w-7xl py-12 md:py-16">
      <h3 className="text-6xl font-bold text-bp-warning uppercase font-rcfull py-8">
        <span className="text-white">WHAT'S THE</span> PLAN
      </h3>
      <ol className="relative border-l border-default">
        {timelineEvents.map((event, index) => (
          <li className="mb-10 ms-4" key={index}>
            <div className="absolute w-3 h-3 bg-default rounded-full mt-1.5 -inset-s-1.5 border border-default bg-white"></div>
            <time className="mb-1 text-sm font-normal leading-none text-white">
              {event.time}
            </time>
            <h3 className="text-lg font-semibold text-bp-warning">
              {event.title}
            </h3>
            <p className="mb-4 text-base font-rcbasic text-gray-100">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
    </div>
  );
}
