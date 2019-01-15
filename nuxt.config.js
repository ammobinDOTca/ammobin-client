const webpack = require('webpack')
const { join } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/apollo', '~/modules/typescript'],
  build: {
    plugins: [
      new webpack.DefinePlugin({
        BASE_API_URL: !!process.env.PROD ? '"https://ammobin.ca/api/"' : '"http://localhost:8080/"',
        PROD: process.env.PROD ? 'true' : 'false',
      }),
      new CopyWebpackPlugin([{ from: 'static' }]),
    ],
    extractCSS: true,
  },
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 2000,
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
        //yandex also feeds duckduckgo
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
      { rel: 'alternate', hreflang: 'en-ca', href: 'https://ammobin.ca/' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://ammobin.ca/' },
    ],
  },
  router: {
    middleware: 'i18n',
  },
  plugins: ['~/plugins/i18n.js', { src: '~/plugins/vue-img', ssr: false }],
  /*
  disabled while working on api memory useage
  cache: {
     max: 1000,
     maxAge: 86400000
   },*/
  manifest: {
    start_url: '/?launcher=true',
    background_color: '#f4f4f4',
    theme_color: '#41b883',
    display: 'standalone',
  },
  workbox: {
    importScripts: ['custom-service-worker.js'],
    globIgnores: ['sw.js', '**/workbox*.js'],
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://ammobin.ca/api/graphql',
      },
    },
  },
  generate: {
    routes: ['/rimfire', '/centerfire', '/shotgun', '/fr/rimfire', '/fr/centerfire', '/fr/shotgun'],
  },
}
