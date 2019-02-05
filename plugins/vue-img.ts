import Vue from 'vue'

import VImgFallback from 'v-img-fallback'

Vue.use(VImgFallback, {
  error: require('~/assets/blank.png'),
})
