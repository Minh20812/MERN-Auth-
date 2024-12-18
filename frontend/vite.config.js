import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://gamemultiplayer-hf9k.onrender.com",
      "/uploads/": "https://gamemultiplayer-hf9k.onrender.com",
      // "/api/": "http://localhost:5000/",
      // "/uploads/": "http://localhost:5000/",
    },
  },
});
