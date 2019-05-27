console.log('hi there. I have a clean API open to use over at https://ammobin.ca/api/graphql')

// cache api GET requests
workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
        new workbox.expiration.Plugin({
        // Only cache requests for 2 days
        maxAgeSeconds: 2* 24 * 60 * 60,
        // Only cache 150 requests.
        maxEntries: 150,
      }),
    ]
  }),
  'GET'
);

// retry track-view requests
const bgSyncPlugin = new workbox.backgroundSync.Plugin('trackViewQueue', {
  maxRetentionTime: 24 * 60 * 7 // Retry for max of a week
});

workbox.routing.registerRoute(
  new RegExp('/api/track-view'),
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);
