import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "images.carexpert.com.au",
        port: "",
        pathname: "/**",
      },
     
    ]
  },
};

export default nextConfig;
