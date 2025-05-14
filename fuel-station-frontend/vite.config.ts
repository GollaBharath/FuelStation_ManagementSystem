import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  // ✅ This handles 404s for client-side routes
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
