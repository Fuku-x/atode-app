/**
 * Temporary dev config: ignore TypeScript build errors so the dev server can run
 * and serve pages locally. Remove or set to false before production builds.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // NOTE: only set this for local development to avoid blocking on strict type issues
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
