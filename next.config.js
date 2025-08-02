/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': `${__dirname}/src`,
    };
    return config;
  },
  compiler: {
    emotion: true
  },
  transpilePackages: ['@babel/preset-react'],
  experimental: {
    appDir: true
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
