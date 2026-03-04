import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('@tanstack/react-query')) return 'query';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
            return 'vendor';
          }

          if (id.includes('/src/data/')) {
            return 'products-data';
          }

          return undefined;
        },
      },
    },
  },
})
