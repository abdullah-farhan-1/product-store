import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure proper asset path resolution
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
