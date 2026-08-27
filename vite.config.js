import { defineConfig } from 'vite'

export default defineConfig({
  // Base path (change if deploying to a subfolder)
  base: './',
  
  // Development server
  server: {
    port: 3000,
    open: true,          // auto-open browser
    host: true           // allow network access (phone testing)
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
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  // Preview server (after build)
  preview: {
    port: 4173,
    open: true
  }
})
