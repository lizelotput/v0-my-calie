/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/mycalie',
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
