// @ts-check
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    proxyTimeout: 90_000,
    externalDir: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/api/uploads/:path*',
        destination:
          process.env.STORAGE_PROVIDER === 'local'
            ? '/uploads/:path*'
            : '/404',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination:
          process.env.STORAGE_PROVIDER === 'local'
            ? '/api/uploads/:path*'
            : '/404',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@gitroom/react': path.resolve(
        __dirname,
        '../../libraries/react-shared-libraries/src'
      ),
      '@gitroom/helpers': path.resolve(
        __dirname,
        '../../libraries/helpers/src'
      ),
      '@gitroom/plugins': path.resolve(
        __dirname,
        '../../libraries/plugins/src'
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
