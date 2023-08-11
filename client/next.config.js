/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon-library.com",
        port: "",
        pathname: "/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    ],
  },
};
