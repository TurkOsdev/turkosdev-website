import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "",
      },
    ],
  },
  async redirects() {
    return [{ source: "/team", destination: "/ekip", permanent: true }];
  },
};

export default nextConfig;
