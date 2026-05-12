import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      primevue: path.resolve(__dirname, './node_modules/primevue'),
      primeicons: path.resolve(__dirname, './node_modules/primeicons'),
    },
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
  server: {
    port: 3000,
  },
});
