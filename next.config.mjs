/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Framer Motion + scroll/layout animations rely on refs & subtle render timing; React Compiler
     auto-memoization can desync the DOM and trigger removeChild NotFoundError in React 19 (prod). */
  reactCompiler: false,
  /* Dev double-mount + GSAP/scroll libs amplifies DOM races; disable until animations are stable. */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lid.zoocdn.com',
      },
    ],
  },
  /* Immutable, long-lived caching for the hero video assets so Vercel's edge
     serves them from cache on every subsequent request and browsers don't
     re-fetch on navigation. The filenames are content-stable; if they ever
     change we'll rename them. */
  async headers() {
    const videoCache = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      /* Byte-range serving lets the browser start playback before the full
         file is downloaded — essential for perceived "instant" video. */
      { key: 'Accept-Ranges', value: 'bytes' },
    ];
    return [
      { source: '/videos/:path*', headers: videoCache },
      { source: '/:file(.*\\.mp4)', headers: videoCache },
      { source: '/hero-videos/:path*', headers: videoCache },
      { source: '/about/:file(.*\\.mp4)', headers: videoCache },
    ];
  },
};

export default nextConfig;
