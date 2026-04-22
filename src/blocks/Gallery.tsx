import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BlueprintGallery({ id }: { id: string }) {
  const images = [
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/1.png?raw=true",
      title: "X-26 GREYWOLF PT-1",
      projecturl: "https://blueprint.hackclub.com/projects/2458",
      author: "M.Abdullah",
      authorurl: "https://blueprint.hackclub.com/users/4135",
      description:
        "This beast, A single engine powered, housing an 80mm EDF in its engine bay. 1.3 meters long, standing .3 meters high. Is the first Prototype of one of my wonderworks of single engine powered series of a highly agile Rc fighter jet, currently in prototyping state, its intended to house a Custom diy Radar that can track and lock on objects it considers hostile. And a telemetry system which can help locate aircraft's altitude, distance from the controller, its heading, and location for google maps, in mid-flight.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/2.png?raw=true",
      title: "Cyberboard",
      projecturl: "https://blueprint.hackclub.com/projects/491",
      author: "NotARoomba",
      authorurl: "https://blueprint.hackclub.com/users/9",
      description:
        "A cyberpunk-themed STM32 development board featuring Bluetooth 5.1 connectivity and integrated Li-ion/LiPo battery charging support.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/3.png?raw=true",
      title: "UDON | Rival Robotics",
      projecturl: "https://blueprint.hackclub.com/projects/1104",
      author: "a**30",
      authorurl: "https://blueprint.hackclub.com/users/2576",
      description:
        "Shuttlecock intaking and shooting robot meant to compete in the Rival Robotics Competition.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/4.png?raw=true",
      title: "ES_01 E-ink Smartwatch",
      projecturl: "https://blueprint.hackclub.com/projects/4721",
      author: "sandgum",
      authorurl: "https://blueprint.hackclub.com/users/5572",
      description:
        "A 5mm thick smartwatch which achieves its thinness by laying out each of its components in a straight line, in their own modules which can bend around each other to conform to the wearer's wrist. The watch features a main E-ink touch display that consumes very little power, accompanied by two small OLEDs at the top and bottom to show rapidly changing data (Like seconds, heart rate etc.). The watch incorporates an ESP32-S3 microcontroller for main processing and establishing a Bluetooth connection to a smartphone. It also incorporates heart rate sensing, an intelligent inertial measurement unit and a pressure/temperature sensor to provide rough fitness and altitude tracking as well.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/5.png?raw=true",
      title: "The G1 Mini Version 2",
      projecturl: "https://blueprint.hackclub.com/projects/117",
      author: "Ghost",
      authorurl: "https://blueprint.hackclub.com/users/322",
      description:
        "This is version two of the awesome 3d printer I designed for Highway. This new one is super stiff and is gonna be wicked fast. I actually have been developing this one for a while, so it is mostly done.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/6.png?raw=true",
      title: "High Voltage Power Supply",
      projecturl: "https://blueprint.hackclub.com/projects/17",
      author: "Sidd",
      authorurl: "https://blueprint.hackclub.com/users/4",
      description:
        "A high voltage power supply that aims to output around 250,000 volts. It utilizes an high frequency transformer fed into a multi-stage Cockroft-Walton multiplier. This array of high-voltage diodes and capacitors should be able to multiply it up to the hundreds of thousands of volts (hopefully).",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/7.png?raw=true",
      title: "OREO- ROBOT dog",
      projecturl: "https://blueprint.hackclub.com/projects/1690",
      author: "A.Adarsh",
      authorurl: "https://blueprint.hackclub.com/users/1409",
      description:
        'OREO V2 is an advanced, open-source quadruped robot designed for high-performance mobility and real-time robotic research. While the original OREO was a great starting point, the V2 is a complete "ground-up" rebuild focusing on power, precision, and the industry-standard ROS 2 Humble framework.',
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/8.png?raw=true",
      title: "Mini Drone",
      projecturl: "https://blueprint.hackclub.com/projects/851",
      author: "manan",
      authorurl: "https://blueprint.hackclub.com/users/1292",
      description:
        "I'm building a drone from scratch using 3D-printed parts, 4 brushless motors, and a custom PCB. I’m researching components, flight controllers, and how to design the frame to make it light but strong.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/9.png?raw=true",
      title: "5DOF Robotic Arm",
      projecturl: "https://blueprint.hackclub.com/projects/9334",
      author: "david1117constantine",
      authorurl: "https://blueprint.hackclub.com/users/16358",
      description:
        "This is my very first full-scale engineering project since I built my own 3D printer, a VORON V0.2R1. The aim of this project is to get more comfortable modeling in Fusion 360 and using Stepper Motors with microcontrollers. Not only that, but the Arm is part of a larger research study I am conducting about the use of brain wave and polarity data and its use in controlling industrial and scientific robotic equipment and devices.",
    },
    {
      url: "https://github.com/CodingWithHardik/assets/blob/main/build-guilds/blueprint/gallery/10.png?raw=true",
      title: "Cuprite",
      projecturl: "https://blueprint.hackclub.com/projects/1254",
      author: "Renovic",
      authorurl: "https://blueprint.hackclub.com/users/2745",
      description: "160mm^3 High Speed Corexy Printer",
    },
  ];
  const SWAP_ORDER = [1, 2, 0, 2, 1, 0];
  function shuffled(arr: any[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
  const trim = (text: string, maxLength: number = 120) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  function ProjectCard({
    project,
    isMain,
    animating,
    isSecond,
    isThird,
  }: {
    project: any;
    isMain: boolean;
    animating: boolean;
    isSecond: boolean;
    isThird: boolean;
  }) {
    return (
      <div
            id={id}
            onClick={() => window.open(project.projecturl, "_blank")}
            className={cn(
              `flex flex-col h-full overflow-visible bg-[#071d35] relative`,
              isMain ? "col-start-1 row-start-1 row-span-2" : "col-start-2",
              animating ? "animate-fadeUp" : "",
            )}
          >
            {isMain ? (
              <div className="overflow-visible">
                <div className="absolute -top-1 -left-8 right-0 h-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -bottom-1 -left-3 right-0 h-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -left-1 -top-5 -bottom-5 w-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -right-1 -top-7 -bottom-4 w-1 bg-bp-warning-darker/80"></div>
              </div>
            ) : null}
            {isSecond ? (
              <div className="overflow-visible">
                <div className="absolute -top-1 left-0 -right-4 h-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -bottom-1 left-0 -right-6 h-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -right-1 -top-6 bottom-0 w-1 bg-bp-warning-darker/80"></div>
              </div>
            ) : null}
            {isThird ? (
              <div className="overflow-visible">
                <div className="absolute -bottom-1 left-0 -right-3 h-1 bg-bp-warning-darker/80"></div>
                <div className="absolute -right-1 top-0 -bottom-6 w-1 bg-bp-warning-darker/80"></div>
              </div>
            ) : null}
            <div className="flex-1 relative overflow-hidden">
              <img
                src={project.url}
                alt={project.title}
                className="w-full h-full object-cover scale-full"
              />
            </div>
            <div className="px-4 py-3 bg-[#071d35]">
              <a
                href={project.authorurl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-bp-warning text-[11px] font-bold uppercase tracking-widest underline underline-offset-1"
              >
                {project.author}
              </a>
              <h4
                className={cn(
                  "text-white font-semibold mt-1",
                  isMain ? "text-sm" : "text-xs",
                )}
              >
                {project.title}
              </h4>
              <p
                className={cn(
                  "text-gray-300 mt-1",
                  isMain ? "text-xs" : "text-[11px]",
                )}
              >
                {isMain ? project.description : trim(project.description, 80)}
              </p>
            </div>
          </div>
    );
  }
  const queue = useRef<any[]>([]);
  const swapIdxRef = useRef(0);
  const getNext = (exclude: any[]) => {
    if (queue.current.length === 0) queue.current = shuffled(images);
    const idx = queue.current.findIndex(
      (p) => !exclude.some((e) => e.projecturl === p.projecturl),
    );
    if (idx === -1) {
      queue.current = shuffled(images);
      return getNext([]);
    }
    return queue.current.splice(idx, 1)[0];
  };
  const initSlots = () => {
    if (images.length < 3) return images;
    const slots: any[] = [];
    for (let i = 0; i < 3; i++) {
      slots.push(getNext(slots));
    }
    return slots;
  };
  const [slots, setSlots] = useState<any[]>([]);
  const [animating, setAnimating] = useState([false, false, false]);
  useEffect(() => {
    const init = initSlots();
    if (images.length < 3) return;
    setSlots(init);
    const interval = setInterval(() => {
      setSlots((previous) => {
        if (previous.length < 3) return previous;
        const slotIdx = SWAP_ORDER[swapIdxRef.current % SWAP_ORDER.length];
        swapIdxRef.current++;
        const next = getNext(previous);
        const updated = [...previous];
        updated[slotIdx] = next;
        setAnimating(() => {
          const updated = [false, false, false];
          updated[slotIdx] = true;
          return updated;
        });
        setTimeout(() => setAnimating([false, false, false]), 600);
        return updated;
      });
    }, 10_000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="bg-[#071d35] px-8 py-12 font-sans">
      <div className="container mx-auto px-6 md:px-14 max-w-7xl">
            <h3 className="text-4xl font-bold text-bp-warning uppercase font-rcfull mb:text-5xl lg:text-6xl">
          <span className="text-white">Blueprint</span> Gallery
        </h3>
        <p className="text-gray-300 max-w-2xl">
          Check out what HackClubers has build all over the world!
        </p>
        <div className="hidden sm:block">
            <div
          className="
                grid grid-cols-2 grid-rows-2 h-140 max-sm:grid-cols-1 max-sm:grid-rows-[420px] max-sm:h-auto my-12 gap-1
            "
        >
          {slots.map((project, idx) => (
            <ProjectCard
              key={`${idx}-${project.title}`}
              project={project}
              isMain={idx === 0}
              isSecond={idx === 1}
              isThird={idx === 2}
              animating={animating[idx]}
            />
          ))}
        </div>
        </div>
        <div className="sm:hidden">
            <div
          className="
                grid grid-cols-2 grid-rows-2 h-140 max-sm:grid-cols-1 max-sm:grid-rows-[420px] max-sm:h-auto my-8 gap-1 
            "
        >
          <ProjectCard
              key={`0-${images[0]?.title}`}
              project={images[0]}
              isMain={true}
              isSecond={false}
              isThird={false}
              animating={animating[0]}
            />
        </div>
        </div>

      </div>
    </div>
  );
}
