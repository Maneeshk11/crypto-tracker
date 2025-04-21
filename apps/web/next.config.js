/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "www.coinbase.com",
      },
      {
        protocol: "https",
        hostname: "static.alchemyapi.io",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
  env: {
    ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
}

export default nextConfig 