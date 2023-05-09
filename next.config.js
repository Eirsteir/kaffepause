/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // To prevent slow dev build time
  // experimental: {
  //   modularizeImports: {
  //     '@mui/material/?(((\\w*)?/?)*)': {
  //       transform: '@mui/material/{{ matches.[1] }}/{{member}}'
  //     },
  //     '@mui/icons-material/?(((\\w*)?/?)*)': {
  //       transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
  //     }
  //   }
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
