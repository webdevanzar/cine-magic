import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    historyApiFallback: true, // Ensures Vite serves index.html for all routes
  },
  build: {
    outDir: "dist",
  },
});
