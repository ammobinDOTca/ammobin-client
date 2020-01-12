import { Configuration } from '@nuxt/types'
import { generateRoutes } from './generate-routes'

const { DefinePlugin } = require('webpack')
const { join } = require('path')
const PROD_API = 'https://ammobin.ca/api/'
const BETA_API = 'https://beta.ammobin.ca/api/'
// const DEV_API = 'http://localhost:8080/api/'

const prod = process.env.PROD === 'true'

export default <Configuration>{
  modern: 'client',
  modules: ['@nuxt/typescript-build', '@nuxtjs/pwa', '@nuxtjs/axios'],
  build: {
    plugins: [
      new DefinePlugin({
        BASE_API_URL: prod ? `"${PROD_API}"` : `"${BETA_API}"`, //`"${DEV_API}"`,
        PROD: prod ? 'true' : 'false',
      }),
    ],
    extractCSS: true,

    extend: config => {
      config.node = {
        fs: 'empty',
      }
    },
  },
  loading: {
    color: '#4FC08D',
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
      {
        name: 'image',
        content: 'https://ammobin.ca/icon.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', hreflang: 'fr-ca', href: 'https://ammobin.ca/fr' },
      { rel: 'alternate', hreflang: 'en-ca', href: 'https://ammobin.ca/en' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://ammobin.ca/en' },
    ],
  },
  router: {
    middleware: ['i18n', 'pageview-tracker'],
    extendRoutes(routes, resolve) {
      routes.unshift(<any>{
        name: 'fr-home',
        path: '/fr',
        component: resolve(__dirname, 'pages/index.vue'),
      })
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
    theme_color: '#41b883',
    display: 'standalone',
  },
  workbox: prod
    ? {
      importScripts: ['custom-service-worker.js'],
      globIgnores: ['sw.js', '**/workbox*.js'],
    }
    : false,
  generate: {
    interval: 500,
    routes: ['/', ...generateRoutes(prod)],
    subFolders: false, // https://nuxtjs.org/api/configuration-generate/#subfolders
    // we want centerfire.html NOT centerfire/index.html (for better )
  },
}
