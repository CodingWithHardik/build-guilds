import Image from "next/image";
import { FaSlack } from "react-icons/fa";

export default function Team() {
    const teamMembers = [
        {
            name: "Hardik Gupta",
            role: "Head Organizer",
            bio: "I am a developer",
            imageUrl: "https://avatars.githubusercontent.com/u/113587014?v=4",
            slackUrl: "https://hackclub.enterprise.slack.com/team/U07GXEVL48P"
        },
    ]
    return (
        <div className="container mx-auto px-6 md:px-14 max-w-7xl py-14">
            <h3 className="text-4xl mb:text-5xl lg:text-6xl  font-bold text-white uppercase font-rcfull px-4 text-center">
                <span className="text-bp-warning">TEAM </span>BEHIND THE BUILD
            </h3>
                <div className="flex flex-wrap justify-center gap-8 my-8 mx-8 lg:mx-0">
                    {
                    teamMembers.map((member, index) => (
                        <div className="bg-[#071d35] border-[#2E4A6F] w-md md:w-[30%] lg:w-[22%] border-2 hover:border-bp-warning" key={index}>
                    <div
                        className="relative w-full aspect-square overflow-hidden"
                    >
                        <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center"
                    />
                    </div>
                    <div className="m-4">
                        <h4 className="text-xl font-bold text-bp-warning font-rcfull">{member.name}</h4>
                        <p className="text-white text-xs uppercase font-rcfull font-bold">{member.role}</p>
                        <p className="text-gray-300 text-sm mt-2 text-wrap">
                            {member.bio}
                        </p>
                        <div className="mt-4">
                            <a href={member.slackUrl} className="text-blue-500 hover:underline"><FaSlack /></a>
                        </div>
                    </div>
                </div>
                    ))
                }
                </div>
        </div>
    );
}