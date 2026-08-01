import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Hotel Serene Praia Admin',
        short_name: 'HSP Admin',
        description: 'Admin dashboard for Hotel Serene Praia',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5242880 // 5 MB
      },
      devOptions: {
        enabled: true
      }
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@config': resolve(__dirname, './src/config'),
      '@types': resolve(__dirname, './src/types'),
      '@data': resolve(__dirname, './src/data'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-gsap': ['gsap'],
          'vendor-ui': ['swiper', 'lightgallery'],
          'vendor-animation': ['framer-motion', 'lenis'],
        },
      },
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    reportCompressedSize: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
  },

  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'gsap/ScrollTrigger',
      'framer-motion',
      'lenis',
    ],
  },
})
