/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!process.env.PYTHON_API_URL) {
      return [];
    }

    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.PYTHON_API_URL}/api/:path*`,
        },
      ],
    };
  },
}

module.exports = nextConfig
