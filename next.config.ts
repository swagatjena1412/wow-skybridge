import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: "/(.*)",
          headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
        },
      ];
    }
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
