// Base URL of the backend REST API.
//
// The Vite dev server forwards requests that start with "/api" to the
// Express backend running on http://localhost:5000 (see vite.config.js).
// If you do not want to use the proxy, you can call the backend directly
// with "http://localhost:5000/api/students" (CORS is enabled there).
export const API_BASE_URL = "/api/students";
