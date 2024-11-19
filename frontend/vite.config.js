import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    port: process.env.NODE_ENV == "development" ? 5173 : 8080
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  plugins: [react()],
})
