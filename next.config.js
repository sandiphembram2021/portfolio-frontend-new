/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'res.cloudinary.com',
      'cloudinary.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
