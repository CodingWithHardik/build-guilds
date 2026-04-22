"use client";

export default function Sponsors({ id, sponsors }: { id: string; sponsors: { name: string; logo: string }[] }) {
  return (
    <div className="py-14 bg-background" id={id}>
        <div className="container mx-auto px-6 md:px-14 max-w-7xl">
          <h3 className="text-4xl mb:text-5xl lg:text-6xl  font-bold text-bp-warning uppercase font-rcfull">
                <span className="text-white">Our</span> Sponsors
              </h3>
          <div className="relative mt-4">
            <div className="flex flex-wrap items-center justify-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4 bg-[#071d35] p-4 border border-[#2E4A6F]">
                {sponsors.map((company, index) => (
                <div className="text-center" key={company.name + index}>
                  <img
                  src={company.logo}
                  className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                  alt={company.name}
                />
                <p className="text-gray-400 text-xs tracking-widest font-semibold pt-2">
                  {company.name}
                </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
