import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium-min'],

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '', // Leave this empty unless the host uses a non-standard port
        pathname: '/**', // Allows any path on this hostname
      },
      {
        protocol: 'https',
        hostname: 'imgcdn.bokun.tools',
        port: '', // Leave this empty unless the host uses a non-standard port
        pathname: '/**', // Allows any path on this hostname
      },
      {
        protocol: 'https',
        hostname: 'bokun.s3.amazonaws.com',
        port: '', // Leave this empty unless the host uses a non-standard port
        pathname: '/**', // Allows any path on this hostname
      },



    ],
  },
};

export default nextConfig;
