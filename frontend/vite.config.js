import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    port: process.env.VITE_PORT
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  plugins: [react()],
})
