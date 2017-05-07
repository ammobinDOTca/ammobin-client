const webpack = require('webpack');
const { join } = require('path');
module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        BASE_API_URL: !!process.env.PROD ? '"https://ammo-api.snapfix.io"' : '"http://localhost:8080/"',
        PROD: process.env.PROD ? 'true' : 'false'
      })
    ],
    extractCSS: true,
    vendor: ['axios'] // Add axios in the vendor.bundle.js
  },
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 1500
  },
  css: [
    `purecss/build/pure${process.env.PROD ? '-min' : ''}.css`,
    `purecss/build/grids-responsive${process.env.PROD ? '-min' : ''}.css`,
    join(__dirname, 'css/main.css')
  ],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Ammo prices across canada' }
    ],
    link: [

    ]
  }
}
