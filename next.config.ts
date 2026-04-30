import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.8'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/CodingWithHardik/assets/**",
      },
       {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/CodingWithHardik/assets/**",
      },
      {
        protocol: "https",
        hostname: "blueprint.f8d710a55cb9b516d88635f103c2c9f2.r2.cloudflarestorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hackclub.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
