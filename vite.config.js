import { defineConfig } from 'vite';

export default defineConfig({
  root: 'code',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
