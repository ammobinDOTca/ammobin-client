<template>
  <div class="container">
    <h1 class="capitalize">
      {{ $t('itemTypes.title', { type: $t('default.' + itemType) }) }}
    </h1>
    <div class="pure-g row">
      <sponsorship />
    </div>
    <div class="pure-g row">
      <div v-for="subType in subtypes" :key="subType" class="pure-u-md-1-3 pure-u-1 margin-y capitalize">
        <nuxt-link :to="path(subType)">{{ subType }}</nuxt-link>
      </div>
      <div class="pure-u-md-1-3 pure-u-1 margin-y capitalize">
        <nuxt-link :to="path('UNKNOWN')">UNKNOWN</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MyTable from '~/components/my-table.vue'
import Sponsorship from '~/components/sponsorship.vue'

import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES, RELOADING_TYPES } from '~/components/constants'
//import '@nuxt/vue-app'
import { Component, Vue } from 'vue-property-decorator'

import { centerFireCalibres } from 'ammobin-classifier/build/centerfire-calibres'
import { rimfireCalibres } from 'ammobin-classifier/build/rimfire-calibres'
import { shotgunGauges } from 'ammobin-classifier/build/shotgun-gauges'
import { getCountry } from '~/helpers'
// import '~/types'

declare const DOMAIN: string

@Component({
  validate({ params }) {
    return ITEM_TYPES.includes(params.itemType)
  },
  head() {
    const that: any = this
    const link: any[] = []
    const url = `https://${DOMAIN}/${this.$i18n.locale}/${that.itemType}`
    if (that.page > 1) {
      link.push({
        rel: 'prev',
        href: getUrl(url, that.page - 1, that.subType),
      })
    }
    if (that.itemsListings && that.itemsListings.pages > that.page) {
      link.push({
        rel: 'next',
        href: getUrl(url, that.page + 1, that.subType),
      })
    }
    const type = this.$t('default.' + that.itemType)
    const area = that.province || getCountry()
    return {
      title: this.$t('itemTypes.title', { type }) as string,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('itemTypes.description', { type }) as string,
        },
      ],
      link,
    }
  },
  mounted() {
    // redirect old subType routes to new page
    if (this.$route.query && this.$route.query.subType) {
      this.$router.push(this.$route.path + '/' + this.$route.query.subType)
    }
  },
  components: {
    Sponsorship,
  },
})
export default class ListingPage extends Vue {
  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType as string)
  }

  get itemType() {
    const itemType = this.$route.params.itemType || this.$route.query.itemType || null
    return itemType
  }
  path(subType) {
    return `/${this.$i18n.locale}/${this.itemType}/${subType}`
  }

  get subtypes() {
    switch (this.itemType) {
      case 'shotgun':
        return shotgunGauges.map(l => l[0].toUpperCase()).sort()
      case 'rimfire':
        return rimfireCalibres.map(l => l[0].toUpperCase()).sort()
      case 'centerfire':
        return centerFireCalibres.map(l => l[0].toUpperCase()).sort()
      case 'reloading':
      case 'powder':
      case 'shot':
      case 'case':
      case 'primer':
        return ['powder', 'shot', 'case', 'primer']
    }
  }
}
</script>

<style scoped>
.center {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>
