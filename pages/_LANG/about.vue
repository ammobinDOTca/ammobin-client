<template>
  <div class="container">
    <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo" />
    <h1>{{ $t('default.about') }}</h1>
    <div>
      <a href="/">ammobin.ca</a>
      {{ $t('about.main1') }}
    </div>
    <div>{{ $t('about.main2') }}</div>
    <div>{{ $t('about.main3') }}</div>

    <hr />

    <h2>{{ $t('about.contactInfo') }}</h2>
    <div>
      {{ $t('about.contactQuestions1') }}
      <div>{{ $t('about.contactQuestion2') }}</div>
      <div>{{ $t('about.contactQuestion3') }}</div>
      <div>{{ $t('about.contactQuestion4') }}</div>

      <div style="margin-top:10px;">
        {{ $t('about.submitIssue') }}
        <a href="https://github.com/ammobinDOTca" target="_blank" rel="noopener">https://github.com/ammobindotca</a>
      </div>
      <div>
        {{ $t('about.sendEmail') }}
        <a :href="mail">{{ email }}</a>
      </div>
    </div>

    <hr />

    <h2>{{ $t('about.disclaimerTitle') }}</h2>
    <p>{{ $t('about.disclaimer') }}</p>

    <hr />

    <h2>{{ $t('about.incorrectCountTitle') }}</h2>
    <p>{{ $t('about.incorrectCountText') }}</p>

    <hr />

    <h2 id="supportedRetailers">{{ $t('about.supportedRetailers') }}</h2>
    <div class="pure-g" v-if="vendors">
      <div v-for="row in randomVendors" :key="row.link" class="pure-u-1 pure-u-md-1-3 m-t-2 m-r-2">
        <a :href="row.link" target="_blank" rel="noopener">
          <img
            :src="row.logo"
            class="pure-img img"
            :class="{ 'grey-background': row.background }"
            :alt="row.name"
            :title="row.name"
          />
        </a>
      </div>
      <div class="pure-u-1 pure-u-md-1-3 m-t-2">
        <h4>{{ $t('about.moreRetailers') }}</h4>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '~/types'

declare const BASE_API_URL: string

function shuffle(input: any[]): any[] {
  const array = [...input]

  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  // // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
@Component({
  head() {
    return {
      title: this.$t('about.title') + ' | ammobin.ca',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.description') as string,
        },
      ],
    }
  },
  async asyncData({ $axios, store }) {
    const f = await $axios.get(BASE_API_URL + 'graphql', {
      params: {
        query: `{vendors{ name logo link background }}`,
        opName: 'vendors',
      },
    })
    const { vendors } = f.data.data
    // store.commit('setVendors', vendors)
    return {
      vendors,
    }
  },
})
export default class AboutPage extends Vue {
  vendors!: string[]

  email = 'contact' + '@' + 'ammobin.ca'
  mail = 'mailto:' + 'contact' + '@' + 'ammobin.ca' // this probably will do nothing to stop bots...
  get randomVendors() {
    return shuffle(this.vendors || []).map(v => {
      v.link += '?utm_source=ammobin.ca'
      return v
    })
  }
}
</script>
<style>
.img {
  display: block;
  margin: auto;
  max-height: 88px;
  max-width: 90%;
}
.m-t-2 {
  margin-top: 25px;
}
.grey-background {
  background-color: darkgrey;
}
</style>
