import type { NextConfig } from "next";

/**
 * We enable `output: export` to facilitate static exports in CI if needed.
 * The app still runs with `next start` for SSR dev/prod, but export is available via `npm run export`.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
