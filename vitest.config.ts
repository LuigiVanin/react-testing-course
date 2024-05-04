import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),

    AutoImport({
      imports: ["vitest"],
      dts: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup-tests.ts", "./tests/setup-tests.ts"],
    include: [
      "tests/**/*.spec.tsx",
      "tests/**/*.spec.ts",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx",
    ],
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude!, //
        "*/types/*", //
        "src/main.tsx", //
      ],
    },
  },
  resolve: {
    alias: [{ find: /^@\/(.+)/, replacement: "./src/" }],
  },
});
