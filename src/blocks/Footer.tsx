import { ChevronRightIcon } from "@radix-ui/react-icons";

type FooterLink = { id: number; title: string; url: string };

export function Footer({ registerUrl, slackUrl, email }: { registerUrl: string; slackUrl: string; email: string }) {
  const footerLinks: FooterLink[][] = [
    [
      { id: 1, title: "Home", url: "#" },
      { id: 2, title: "About", url: "#about" },
      { id: 3, title: "Schedule", url: "#schedule" },
      { id: 4, title: "Gallery", url: "#gallery" },
      { id: 5, title: "Team", url: "#team" },
      { id: 6, title: "FAQ", url: "#faq" },
    ],
    [
      { id: 7, title: "Hackclub", url: "https://hackclub.com" },
      { id: 8, title: "Blueprint", url: "https://blueprint.hackclub.com" },
      { id: 9, title: "Team", url: "#team" },
      { id: 10, title: "Register", url: registerUrl },
      { id: 11, title: "Slack #build-guild-kanpur", url: slackUrl },
      { id: 12, title: "Contact Us", url: `mailto:${email}` },
    ],
  ];
  return (
    <div className="mx-auto w-full bg-[#071d35]">
      <div className="container mx-auto px-6 md:px-14 max-w-7xl">
        <div className="flex flex-col py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start justify-start gap-y-5">
            <a href="#" className="flex items-center gap-x-2.5">
              <img
                className="h-16 w-full rounded-md"
                src="https://github.com/CodingWithHardik/assets/blob/main/build-guilds/logo.png?raw=true"
                alt=""
              />
            </a>
            <p className="tracking-tight text-gray-300">A Hack Club Event.</p>
            <p className="text-sm tracking-tight text-bp-warning sm:text-center">
              Made By{" "}
              <a
                href="https://github.com/CodingWithHardik"
                className="text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                CodingWithHardik
              </a>
            </p>
          </div>
          <div className="pt-5 md:w-1/2">
            <div className="flex items-center justify-between gap-x-3 px-0 lg:px-10">
              {footerLinks.map((column, columnIndex) => (
                <ul key={columnIndex} className="flex flex-col gap-y-2">
                  {column.map((link) => (
                    <li
                      key={link.id}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium duration-200 text-bp-warning hover:text-bp-warning-darker"
                    >
                      <a href={link.url}>{link.title}</a>
                      <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
