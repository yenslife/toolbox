import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 設定檔案大小
  experimental: {
    serverActions: {
      bodySizeLimit: '2gb',
    },
  },
};

export default nextConfig;
