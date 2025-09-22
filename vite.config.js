import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),
  react(),
  VitePWA({
    registerType: 'autoUpdate', // automatically updates service worker
    includeAssets: ['/icons/favicon.ico', 'robots.txt', '/icons/apple-touch-icon.png'],
    manifest: {
      name: 'Izel Design Stdio',
      short_name: 'Izel Designs',
      description: 'Your Vision Our Creation',
      theme_color: '#000000',       // black theme color
      background_color: '#ffffff',  // white background
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icons/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
           purpose: 'any maskable'
        },
        {
          src: '/icons/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
           purpose: 'any maskable'
        },
        {
          src: '/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
           purpose: 'any maskable'
        },
      ],
    },
    workbox:{
      runtimeCaching: [
          {
            // cache all images (local + remote)
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100, // store up to 100 images
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
    }
  }),
  ],

})
