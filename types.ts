import { Component } from 'vue-property-decorator'
import Vue, { ComponentOptions } from 'vue'

//import '@nuxt/vue-app'
declare module 'vue/types/vue' {
  interface Vue {
    apollo: any
  }
}

// taken from https://github.com/Akryum/vue-apollo/blob/master/types/vue.d.ts
// since https://github.com/Akryum/vue-apollo/pull/627 is not yet merged + released
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: any
  }
}
