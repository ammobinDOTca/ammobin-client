import { NuxtConfig } from '@nuxt/types'
import { generateRoutes } from './generate-routes'

const { DefinePlugin } = require('webpack')
const { join } = require('path')

// const DEV_API = 'http://localhost:8080/api/'

const prod = process.env.PROD === 'true'

const region = process.env.REGION || 'CA'
const DOMAIN = `${prod ? '' : 'beta.'}ammobin.${region.toLowerCase()}`
const BASE_URL = `https://${DOMAIN}`

function getHead(region): any[] {
  switch (region) {
    case 'CA':
      return [
        { hid: 'description', name: 'description', content: 'The place to view ammo prices across Canada.' },
        {
          // google webmaster
          name: 'google-site-verification',
          content: 'X3ZsfEygJo1ywKMaf5Q8ltUgkgK7o9buM7yMsI6G7yc',
        },
        {
          // bing webmaster (since helps to feed duckduckgo)
          name: 'msvalidate.01',
          content: '330D6A0BB2221C7F78C038494DE50309',
        },
        {
          // yandex also feeds duckduckgo
          name: 'yandex-verification',
          content: '99071bdc94d7e5ed',
        },
        {
          name: 'theme_color',
          content: '#41b883',
        },
      ]
    case 'US':
      return [
        { hid: 'description', name: 'description', content: 'TODO' },
        {
          // google webmaster
          name: 'google-site-verification',
          content: 'TODO',
        },
        {
          // bing webmaster (since helps to feed duckduckgo)
          name: 'msvalidate.01',
          content: 'TODO',
        },
        {
          // yandex also feeds duckduckgo
          name: 'yandex-verification',
          content: 'TODO',
        },
        {
          name: 'theme_color',
          content: '#0000',
        },
      ]
    default:
      throw 'UNKNOWN region: ' + region
  }
}

function getLinks(region) {
  const links: any[] = [
    { rel: 'alternate', hreflang: 'en-ca', href: `${BASE_URL}/en` },
    { rel: 'alternate', hreflang: 'x-default', href: `${BASE_URL}/en` },
  ]
  if (region === 'CA') {
    links.push({ rel: 'alternate', hreflang: 'fr-ca', href: `${BASE_URL}/fr` })
    links.push({ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' })
    // links.push({ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' })
  } else {
    links.push({ rel: 'icon', type: 'image/x-icon', href: `/favicon-${region.toLowerCase()}.ico` }) // todo: make constant
  }
  return links
}
console.log(`
DOMAIN: "${DOMAIN}"
BASE_URL: "${BASE_URL}"
BASE_API_URL: "${BASE_URL}/api/"
PROD: ${prod}
REGION: "${region}"
`)

export default <NuxtConfig>{
  modern: 'client',
  modules: ['@nuxt/typescript-build', '@nuxtjs/pwa', '@nuxtjs/axios'],
  build: {
    plugins: [
      new DefinePlugin({
        DOMAIN: `"${DOMAIN}"`,
        BASE_URL: `"${BASE_URL}"`,
        BASE_API_URL: `"${BASE_URL}/api/"`, //`"${DEV_API}"`,
        PROD: prod ? 'true' : 'false',
        REGION: `"${region}"`,
      }),
    ],
    extractCSS: true,

    extend: (config, { loaders: { imgUrl } }) => {
      config.node = {
        fs: 'empty',
      }
      imgUrl.limit = 1 // no inline imgs (csp wont allow them)
    },
  },
  loading: {
    color: '#4FC08D', // ToDO
    failedColor: '#bf5050',
    duration: 2000,
    continuous: true,
  },
  css: [
    `purecss/build/pure${process.env.PROD ? '-min' : ''}.css`,
    `purecss/build/grids-responsive${process.env.PROD ? '-min' : ''}.css`,
    join(__dirname, 'css/main.css'),
  ],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      {
        name: 'image',
        content: `${BASE_URL}/icon-${region}.png`,
      },
      ...getHead(region),
    ],
    link: [...getLinks(region)],
  },
  router: {
    middleware: ['i18n', 'pageview-tracker'],
    extendRoutes(routes, resolve) {
      if (region === 'CA') {
        routes.unshift(<any>{
          name: 'fr-home',
          path: '/fr',
          component: resolve(__dirname, 'pages/index.vue'),
        })
      }
    },
  },
  plugins: [
    '~/plugins/i18n',
    { src: '~/plugins/vue-img', ssr: false },
    { src: '~/plugins/performance', ssr: false },
    { src: '~/plugins/error-reporter', ssr: false },
  ],
  /*
  disabled while working on api memory useage
  cache: {
     max: 1000,
     maxAge: 86400000
   }, */
  manifest: {
    start_url: '/?launcher=true',
    background_color: '#f4f4f4',
    theme_color: region === 'US' ? '#0A3161' : '#41b883',
    display: 'standalone',
  },
  pwa: {
    workbox: prod
      ? {
          importScripts: ['custom-service-worker.js'],
          globIgnores: ['sw.js', '**/workbox*.js'],
        }
      : false,
  },
  generate: {
    interval: 500,
    routes: ['/', ...generateRoutes(prod && region === 'CA', region)], // TODO update for launch
    subFolders: false, // https://nuxtjs.org/api/configuration-generate/#subfolders
    // we want centerfire.html NOT centerfire/index.html (for better )
  },
}
