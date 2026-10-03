import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The proxy forwards API calls to the Express backend (http://localhost:5000),
// so the frontend and backend work together while developing.
// (CORS is also enabled on the backend, so calling
//  http://localhost:5000 directly would work too.)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
