/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Framer Motion + scroll/layout animations rely on refs & subtle render timing; React Compiler
     auto-memoization can desync the DOM and trigger removeChild NotFoundError in React 19 (prod). */
  reactCompiler: false,
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
    ],
  },
};

export default nextConfig;
