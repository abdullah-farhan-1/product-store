import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output is in 'dist'
  },
  server: {
    port: 3000,
  },
});
