import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // Focus on the "Single HTML File" request for portability
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // Inline everything
  }
});
