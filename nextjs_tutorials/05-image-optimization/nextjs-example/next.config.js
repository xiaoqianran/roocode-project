/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'], // 允许的图片域名列表
    // 如果使用 Next.js 13+，推荐使用 remotePatterns
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;