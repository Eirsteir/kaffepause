/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  // pwa
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

module.exports = nextConfig;
