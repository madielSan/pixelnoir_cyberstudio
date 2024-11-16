import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage']
        }
      }
    },
    // Ensure _redirects is copied to build output
    copyPublicDir: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  // Ensure proper base URL and handling of routes
  base: '/',
  server: {
    historyApiFallback: true
  },
  // Properly resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});