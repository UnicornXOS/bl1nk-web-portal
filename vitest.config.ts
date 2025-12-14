import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import type { InlineConfig } from 'vitest';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "client/**/*.test.ts",
      "client/**/*.test.tsx",
      "client/**/*.spec.ts",
      "client/**/*.spec.tsx",
      "shared/**/*.test.ts",
      "shared/**/*.spec.ts",
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
    ],
    setupFiles: ["./test/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/dist/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
});
