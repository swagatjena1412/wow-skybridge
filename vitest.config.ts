import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/.next/**",
        "**/*.d.ts",
        "**/types.ts",
        "components/ui/**",
        // Layout is mostly framework metadata; not meaningful to unit-test.
        "app/layout.tsx",
        // Service worker registration is browser-only side effect.
        "components/RegisterSW.tsx",
        // Plain re-exports / utility shims with trivial logic.
        "lib/utils.ts",
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 80,
        statements: 90,
      },
    },
  },
});
