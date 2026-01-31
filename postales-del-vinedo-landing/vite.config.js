import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Postales/',

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: 'docs',
    sourcemap: false,
    emptyOutDir: true,

    // ✅ Vite minifica con esbuild (rápido, sin dependencia extra)
    minify: 'esbuild',

    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
