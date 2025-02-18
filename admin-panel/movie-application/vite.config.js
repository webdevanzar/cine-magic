import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    historyApiFallback: true, // Ensures Vite serves index.html for all routes
  },
  build: {
    outDir: "dist",
  },
});
