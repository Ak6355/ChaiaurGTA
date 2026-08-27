import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repository name
  base: '/ChaiaurGTA/',

  // Development server
  server: {
    port: 3000,
    open: true, // auto-open browser
    host: true, // allow network access
  },

  // Build output
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,

    rollupOptions: {
      output: {
        // Clean asset names
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  // Preview server
  preview: {
    port: 4173,
    open: true,
  },
})