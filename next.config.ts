import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/CodingWithHardik/assets/**",
      },
    ],
  },
};

export default nextConfig;
