import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Set this to an appropriate value
    }
  },
};

export default nextConfig;
