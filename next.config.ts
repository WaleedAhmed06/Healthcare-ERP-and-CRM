import type { NextConfig } from 'next';
const config: NextConfig = {
  reactStrictMode: true,
  ...(process.env.NEXT_STATIC_EXPORT === 'true' && {
    output: 'export',
    trailingSlash: true,
  }),
};
export default config;
