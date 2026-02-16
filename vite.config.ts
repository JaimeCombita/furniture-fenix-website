import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 7,
      },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
  ],
})
