import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'Tyree Zacharopoulos - Network Engineer & Developer',
    //     short_name: 'Tyree Zacharopoulos',
    //     description:
    //       'Official website of Tyree Zacharopoulos, a Network Engineer and Developer specializing in network infrastructure, automation, and software development.',
    //     start_url: '/',
    //     display: 'standalone',
    //     background_color: '#000000',
    //     theme_color: '#000000',
    //     icons: [
    //       {
    //         src: 'https://r2.tyree.ca/root/icons/android-chrome-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'https://r2.tyree.ca/root/icons/apple-touch-icon.png',
    //         sizes: '180x180',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'https://r2.tyree.ca/root/icons/favicon.ico',
    //         sizes: '16x16',
    //         type: 'image/x-icon'
    //       }
    //     ]
    //   },
    //   devOptions: {
    //     enabled: false
    //   }
    //   // srcDir: 'src',
    //   // filename: 'service-worker.js'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
