console.log('hi there. I have a clean API open to use over at https://ammobin.ca/api/graphql')

// cache api GET requests
workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Only cache requests for 1 days
        maxAgeSeconds: 12 * 60 * 60,
        // Only cache 150 requests.
        maxEntries: 150,
      }),
    ],
  }),
  'GET'
)

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
)

// retry track-view requests
const bgSyncPlugin = new workbox.backgroundSync.Plugin('trackViewQueue', {
  maxRetentionTime: 24 * 60 * 7, // Retry for max of a week
})

workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
)
