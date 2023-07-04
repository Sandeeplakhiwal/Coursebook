import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Specify your custom proxy rules here
      "/api": {
        target: "http://localhost:4000", // The backend server URL
        changeOrigin: true, // Change the origin of the request to the target URL
        // rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the request path
        secure: true,
      },
    },
  },
});
