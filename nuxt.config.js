const webpack = require('webpack');
module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({ BASE_API_URL: !!process.env.PROD ? '"TODO"' : '"http://localhost:8080/"' })
    ],
    vendor: ['axios'] // Add axios in the vendor.bundle.js
  },
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 1500
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/purecss@0.6.2/build/pure-min.css',
        integrity: 'sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD',
        crossorigin: 'anonymous'
      }
    ]
  }
}
