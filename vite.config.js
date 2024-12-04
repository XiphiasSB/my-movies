import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Inject environment variables
  },
});
