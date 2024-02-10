// Import Workbox libraries and methods
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache all assets specified in the service worker manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Cache responses with status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration for cached responses
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }),
  ],
});

// Warm the cache with specified URLs using the pageCache strategy
warmStrategyCache({
  urls: ["/index.html", "/"], // Warm cache for index.html and root path
  strategy: pageCache, // Use the pageCache strategy
});

// Register a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register a route for caching assets using a StaleWhileRevalidate strategy
registerRoute(
  // Match requests for style, script, or image files
  ({ request }) => ["style", "script", "image"].includes(request.destination),
  // Create a StaleWhileRevalidate strategy for asset caching
  new StaleWhileRevalidate({
    cacheName: "asset-cache", // Cache name for assets
    plugins: [
      // Cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
