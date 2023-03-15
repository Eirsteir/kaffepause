/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // To prevent slow dev build time
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}'
      },
      '@mui/material': {
        transform: '@mui/material/{{member}}'
      },
      '@mui/lab': {
        transform: '@mui/lab/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  }
}

module.exports = nextConfig
