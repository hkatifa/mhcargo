import i18nConfig from './next-i18next.config.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { ...i18nConfig.i18n, localeDetection: false },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/brand/:path*',
          destination: '/api/brand/:path*',
        },
      ],
    }
  },
};

export default nextConfig;
