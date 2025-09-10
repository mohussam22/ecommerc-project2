import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-products/**', // <-- أضف الـ "/" في البداية
      },
    ],
  },
}

export default config
