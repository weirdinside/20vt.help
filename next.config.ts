import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'ntzseamwgwdavmrdziiy.supabase.co',
        port: '',
        search: '',
    }]
  },
};

export default nextConfig;
