import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ✅ En Vercel se sirve desde la raíz del dominio
  base: '/',

  server: {
    port: 3000,
    open: true
  },

  build: {
    // ✅ Output estándar para Vercel
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,

    // ⚡ Minificación rápida y estable
    minify: 'esbuild',

    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion']
        }
      }
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})
