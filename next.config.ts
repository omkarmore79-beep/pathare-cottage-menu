/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-640de6e1ef8c4a3093c6268acc14e529.r2.dev",
      },
    ],
  },
};

module.exports = nextConfig;
