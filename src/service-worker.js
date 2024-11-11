self.__WB_DISABLE_DEV_LOGS = false; // Enable Workbox logging

// Import Workbox libraries for caching strategies
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precache files generated by the build process
precacheAndRoute(self.__WB_MANIFEST);

// Function to log cache actions with details
function logCacheAction(action, cacheName, url) {
  console.log(`[Service Worker] ${action}: ${url} in cache '${cacheName}'`);
}

// Define caching strategies with detailed logging
registerRoute(
  /^https:\/\/r2\.tyree\.ca\/.*\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|mp4|webm|mp3)$/,
  new CacheFirst({
    cacheName: 'external-cache',
    plugins: [
      {
        cacheDidUpdate: ({ request }) => logCacheAction('Updated', 'external-cache', request.url),
        cachedResponseWillBeUsed: ({ request }) => logCacheAction('Serving from', 'external-cache', request.url)
      }
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      {
        cacheDidUpdate: ({ request }) => logCacheAction('Updated', 'html-cache', request.url),
        cachedResponseWillBeUsed: ({ request }) => logCacheAction('Serving from', 'html-cache', request.url)
      }
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      {
        cacheDidUpdate: ({ request }) => logCacheAction('Updated', 'assets-cache', request.url),
        cachedResponseWillBeUsed: ({ request }) => logCacheAction('Serving from', 'assets-cache', request.url)
      }
    ]
  })
);

// Console command listeners to purge and renew caches
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  const { command } = event.data;

  if (command === 'purgeCaches') {
    console.log('[Service Worker] Purging all caches...');
    const cacheKeys = await caches.keys();
    for (const cacheName of cacheKeys) {
      console.log(`[Service Worker] Deleting cache: ${cacheName}`);
      await caches.delete(cacheName);
    }
    console.log('[Service Worker] All caches purged.');
  } else if (command === 'renewCaches') {
    console.log('[Service Worker] Renewing caches by re-fetching resources...');
    const cacheKeys = await caches.keys();
    for (const cacheName of cacheKeys) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      for (const request of requests) {
        console.log(`[Service Worker] Re-fetching: ${request.url} in cache '${cacheName}'`);
        await cache.add(request);
      }
    }
    console.log('[Service Worker] Caches renewed.');
  }
});