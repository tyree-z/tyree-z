import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker
      manifest: {
        name: 'Tyree Zacharopoulos - Network Engineer & Developer',
        short_name: 'Tyree Zacharopoulos',
        description:
          'Official website of Tyree Zacharopoulos, a Network Engineer and Developer specializing in network infrastructure, automation, and software development.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: 'https://r2.tyree.ca/root/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://r2.tyree.ca/root/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'https://r2.tyree.ca/root/icons/favicon.ico',
            sizes: '16x16',
            type: 'image/x-icon'
          }
        ]
      },
      devOptions: {
        enabled: false
      },
      workbox: {
        cacheId: 'tyree-z',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/r2\.tyree\.ca\/.*\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|mp4|webm|mp3)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-resources',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'document', // Cache HTML pages
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // Cache for 1 day
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style', // Cache CSS and JS files
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
              }
            }
          }
        ]
      },
      srcDir: 'src', // Set a directory for service worker
      filename: 'service-worker.js'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
