/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['metawallet.mypinata.cloud'],
  },
}

module.exports = nextConfig
