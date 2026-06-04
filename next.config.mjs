import i18nConfig from './next-i18next.config.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { ...i18nConfig.i18n, localeDetection: false },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
