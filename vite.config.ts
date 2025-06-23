import path from 'node:path'
import IconSpritePlugin from '@endmvp/vite-plugin-svgsg'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@layout': path.resolve(__dirname, 'src/modules/layout'),
      '@product': path.resolve(__dirname, 'src/modules/product'),
      '@cart': path.resolve(__dirname, 'src/modules/cart'),
      '@home': path.resolve(__dirname, 'src/modules/home'),
      '@auth': path.resolve(__dirname, 'src/modules/auth'),
      '@search': path.resolve(__dirname, 'src/modules/search'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    // IconSpritePlugin({
    //   iconsDir: 'public/icons',
    //   outDir: 'src/assets/',
    // }),
  ],
})
