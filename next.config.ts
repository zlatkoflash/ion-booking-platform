import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point it explicitly to your new configuration engine file
const withNextIntl = createNextIntlPlugin(
  './translations-engine/request.ts'
);


const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com'],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kteqrchatotypfdxrsum.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'bokun.s3.amazonaws.com',
        port: '',
        pathname: '/**', // Allows all image paths inside this bucket
      },
      // imgcdn.bokun.tools
      {
        protocol: 'https',
        hostname: 'imgcdn.bokun.tools',
        port: '',
        pathname: '/**',
      },


    ],
  },
};

// export default nextConfig;
export default withNextIntl(nextConfig);
