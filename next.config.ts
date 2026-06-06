import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const frontendRoot = path.dirname(fileURLToPath(import.meta.url));
const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = isGhPages ? "/AegisSOC-frontend" : "";

const backendUrl =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:8011";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath,
  assetPrefix: isGhPages ? `${basePath}/` : undefined,
  trailingSlash: isGhPages,
  images: { unoptimized: true },
  turbopack: {
    root: frontendRoot,
  },
  env: {
    NEXT_PUBLIC_STATIC_HOST: isGhPages ? "true" : "false",
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGhPages
    ? {}
    : {
        async rewrites() {
          return [
            {
              source: "/api/backend/:path*",
              destination: `${backendUrl}/:path*`,
            },
          ];
        },
      }),
};

export default nextConfig;
