/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://ignewsmariobr.prismic.io/*",
      },
    ];
  },
};
