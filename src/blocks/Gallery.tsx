import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BlueprintGallery() {
  const images = [
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/7h6l08cvpwgjuypdbvt9l793qcfs?response-content-disposition=inline%3B%20filename%3D%22added%20servo%20cover%20for%20wing%20v6.png%22%3B%20filename%2A%3DUTF-8%27%27added%2520servo%2520cover%2520for%2520wing%2520v6.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T075100Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ab29306db46bf62a85073c1fa72afa45ad3025fc352ac8ae782862a8637cc0d0",
      title: "X-26 GREYWOLF PT-1",
      projecturl: "https://blueprint.hackclub.com/projects/2458",
      author: "M.Abdullah",
      authorurl: "https://blueprint.hackclub.com/users/4135",
      description:
        "This beast, A single engine powered, housing an 80mm EDF in its engine bay. 1.3 meters long, standing .3 meters high. Is the first Prototype of one of my wonderworks of single engine powered series of a highly agile Rc fighter jet, currently in prototyping state, its intended to house a Custom diy Radar that can track and lock on objects it considers hostile. And a telemetry system which can help locate aircraft's altitude, distance from the controller, its heading, and location for google maps, in mid-flight.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/9quv74y4lviq1ltdyru5fmcncjvu?response-content-disposition=inline%3B%20filename%3D%22Cyberboard.jpg%22%3B%20filename%2A%3DUTF-8%27%27Cyberboard.jpg&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T083817Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d352ac065cedccc26c774a8323349ba4deb2219329f1d371e4480286f9d26088",
      title: "Cyberboard",
      projecturl: "https://blueprint.hackclub.com/projects/491",
      author: "NotARoomba",
      authorurl: "https://blueprint.hackclub.com/users/9",
      description:
        "A cyberpunk-themed STM32 development board featuring Bluetooth 5.1 connectivity and integrated Li-ion/LiPo battery charging support.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/uwsoa4m094hdsi8o9g92br3kqyr2?response-content-disposition=inline%3B%20filename%3D%22image.png%22%3B%20filename%2A%3DUTF-8%27%27image.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T083930Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d7d8dcda1433313c4ba77667c993a8df513ad5a10668d98a21408dd053ad059c",
      title: "UDON | Rival Robotics",
      projecturl: "https://blueprint.hackclub.com/projects/1104",
      author: "a**30",
      authorurl: "https://blueprint.hackclub.com/users/2576",
      description:
        "Shuttlecock intaking and shooting robot meant to compete in the Rival Robotics Competition.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/qwajcoo2tdvkyc9uljq9mwog6f2t?response-content-disposition=inline%3B%20filename%3D%22FancyRender1.png%22%3B%20filename%2A%3DUTF-8%27%27FancyRender1.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T075054Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5d38ac7a3ec641339dc3d4f5aee1d878328a5be330ebfb8a0e7fcbc2c900ab16",
      title: "ES_01 E-ink Smartwatch",
      projecturl: "https://blueprint.hackclub.com/projects/4721",
      author: "sandgum",
      authorurl: "https://blueprint.hackclub.com/users/5572",
      description:
        "A 5mm thick smartwatch which achieves its thinness by laying out each of its components in a straight line, in their own modules which can bend around each other to conform to the wearer's wrist. The watch features a main E-ink touch display that consumes very little power, accompanied by two small OLEDs at the top and bottom to show rapidly changing data (Like seconds, heart rate etc.). The watch incorporates an ESP32-S3 microcontroller for main processing and establishing a Bluetooth connection to a smartphone. It also incorporates heart rate sensing, an intelligent inertial measurement unit and a pressure/temperature sensor to provide rough fitness and altitude tracking as well.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/vdg5bzzghdk8a5w1qbn8n385eu8v?response-content-disposition=inline%3B%20filename%3D%22screenshot_2025-06-22_184646_720.png%22%3B%20filename%2A%3DUTF-8%27%27screenshot_2025-06-22_184646_720.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T075100Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7de4f61674b5ece6eebb05ccbff799b037b9c357ea8ab901b2ea0ec11aa88731",
      title: "The G1 Mini Version 2",
      projecturl: "https://blueprint.hackclub.com/projects/117",
      author: "Ghost",
      authorurl: "https://blueprint.hackclub.com/users/322",
      description:
        "This is version two of the awesome 3d printer I designed for Highway. This new one is super stiff and is gonna be wicked fast. I actually have been developing this one for a while, so it is mostly done.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/fqd4kv8ts6fnaa8cgfkkbp5fcu2y?response-content-disposition=inline%3B%20filename%3D%223f9d282f-023f-48bd-ba73-684587c5a4c4.png%22%3B%20filename%2A%3DUTF-8%27%273f9d282f-023f-48bd-ba73-684587c5a4c4.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T075100Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2560aeb234243c07bd2d389a0ac5998e1ad71378a3c7a0fdc200d80e11a5c90e",
      title: "High Voltage Power Supply",
      projecturl: "https://blueprint.hackclub.com/projects/17",
      author: "Sidd",
      authorurl: "https://blueprint.hackclub.com/users/4",
      description:
        "A high voltage power supply that aims to output around 250,000 volts. It utilizes an high frequency transformer fed into a multi-stage Cockroft-Walton multiplier. This array of high-voltage diodes and capacitors should be able to multiply it up to the hundreds of thousands of volts (hopefully).",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/yg3ixjhdqgd6vo4t8r4tm1m8mbfi?response-content-disposition=inline%3B%20filename%3D%22hahahfahhhh%25282%2529.jpg%22%3B%20filename%2A%3DUTF-8%27%27hahahfahhhh%25282%2529.jpg&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T084138Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2c39d69de370cb10e58e9e60563d5f6bce59a616d26617cbd434ca2251e1ae33",
      title: "OREO- ROBOT dog",
      projecturl: "https://blueprint.hackclub.com/projects/1690",
      author: "A.Adarsh",
      authorurl: "https://blueprint.hackclub.com/users/1409",
      description:
        'OREO V2 is an advanced, open-source quadruped robot designed for high-performance mobility and real-time robotic research. While the original OREO was a great starting point, the V2 is a complete "ground-up" rebuild focusing on power, precision, and the industry-standard ROS 2 Humble framework.',
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/vf30xwc26gaikvtp8fy5jfv6aktg?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202025-10-21%20161754.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202025-10-21%2520161754.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T084138Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ddd753a56b80ea418d8baa3c9a8d66ca84ec9b32518b2405d838635d79818b85",
      title: "Mini Drone",
      projecturl: "https://blueprint.hackclub.com/projects/851",
      author: "manan",
      authorurl: "https://blueprint.hackclub.com/users/1292",
      description:
        "I'm building a drone from scratch using 3D-printed parts, 4 brushless motors, and a custom PCB. I’m researching components, flight controllers, and how to design the frame to make it light but strong.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/jljwf0jqowxcf3pcy50u3ty6q32t?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202026-01-28%20104225.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202026-01-28%2520104225.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T085253Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=512c08b371a786ae350f6ccc3f2d64c959544fdc8c1488701e83dc1b8defcb36",
      title: "5DOF Robotic Arm",
      projecturl: "https://blueprint.hackclub.com/projects/9334",
      author: "david1117constantine",
      authorurl: "https://blueprint.hackclub.com/users/16358",
      description:
        "This is my very first full-scale engineering project since I built my own 3D printer, a VORON V0.2R1. The aim of this project is to get more comfortable modeling in Fusion 360 and using Stepper Motors with microcontrollers. Not only that, but the Arm is part of a larger research study I am conducting about the use of brain wave and polarity data and its use in controlling industrial and scientific robotic equipment and devices.",
    },
    {
      url: "https://blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com/wigqriswr0ksrsy7mp9lqzngv8qv?response-content-disposition=inline%3B%20filename%3D%22Cuprite%20v28.png%22%3B%20filename%2A%3DUTF-8%27%27Cuprite%2520v28.png&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b27cbf3ecad4135891e6187077206c69%2F20260412%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260412T085610Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=bcf4d7dbb355abcd40af7907ed036ba6cd7933bed8e19ca0bc545b797e0b42ae",
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
