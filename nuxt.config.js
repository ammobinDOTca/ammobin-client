module.exports = {
  build: {
    vendor: ['axios'] // Add axios in the vendor.bundle.js
  },
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 1500
  },
  head: {

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
