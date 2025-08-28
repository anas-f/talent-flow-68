/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  // Add this if you're using images from external domains
  images: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
