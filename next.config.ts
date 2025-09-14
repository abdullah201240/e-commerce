import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || ["images.unsplash.com"],
  },

  /* config options here */
};

export default nextConfig;
