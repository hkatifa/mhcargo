/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
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
