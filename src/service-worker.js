/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

clientsClaim()

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST)

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    } // Return true to signal that we want to use the handler.

    return true
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL)
)

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.split('.').pop().match(/^(png|css|svg|woff2)$/), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new CacheFirst({
    cacheName: 'static',
    plugins: [
      new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
        maxEntries: 80
      })
    ]
  })
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
registerRoute(
  ({ url }) => url.origin === 'https://res.cloudinary.com',
  new CacheFirst({
    cacheName: 'cloudinary_images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
        maxEntries: 60
      })
    ]
  })
)
registerRoute(
  ({ url }) => url.origin === 'https://gilroy-web-fonts.s3.amazonaws.com' || url.origin === 'https://fonts.googleapis.com',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60
      })
    ]
  })
)

registerRoute(
  ({ url }) => url.origin === 'https://api.yup.io',
  new CacheFirst({
    cacheName: 'yup',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60, // 1hour
        maxEntries: 500
      })
    ]
  })
)
registerRoute(
  ({ url }) => url.origin === 'https://www.googletagmanager.com' || url.origin === 'https://cdn.segment.com' || url.origin === 'http://cdn4.mxpnl.com',
  new CacheFirst({
    cacheName: 'scripts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60
      })
    ]
  })
)
registerRoute(
  ({ url }) => url.origin === 'https://www.youtube.com',
  new CacheFirst({
    cacheName: 'youtube',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60
      })
    ]
  })
)
registerRoute(
  ({ url }) => url.origin === 'https://api.faviconkit.com',
  new CacheFirst({
    cacheName: 'faviconkit',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60
      })
    ]
  })
)
// Any other custom service worker logic can go here.
