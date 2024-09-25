/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    cssChunking: 'strict',
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
