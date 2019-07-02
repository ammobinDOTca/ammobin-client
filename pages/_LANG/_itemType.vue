<template>
  <div class="container">
    <div v-if="!isAmmoType">{{ $t('default.betaWarning') }}</div>
    <h1>{{ $t('default.' + (itemType || 'ammo')) }}</h1>
    <my-table
      v-if="!error && itemsListings"
      :rows="itemsListings.items"
      :pages="itemsListings.pages"
      :item-type="itemType"
      :vendors="[null].concat(vendors.map(i => i.name))"
    />
    <div v-if="error">ERROR {{ error }}</div>
    <div v-if="!itemsListings">{{ $t('default.loading') }}</div>
  </div>
</template>

<script lang="ts">
import MyTable from '~/components/my-table.vue'
import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES } from '~/components/constants'
import gql from 'graphql-tag'
import '@nuxt/vue-app'
import { Component, Vue } from 'vue-property-decorator'
import '~/types'

@Component({
  apollo: {
    vendors: {
      query: gql`
        query getVendors {
          vendors {
            name
          }
        }
      `,
    },
    itemsListings: {
      query: gql`
        query getitemsListings(
          $itemType: ItemType
          $page: Int
          $pageSize: Int
          $subType: String
          $province: Province
          $vendor: String
          $query: String
          $sortField: SortField
          $sortOrder: SortOrder
        ) {
          itemsListings(
            itemType: $itemType
            page: $page
            pageSize: $pageSize
            subType: $subType
            province: $province
            vendor: $vendor
            sortField: $sortField
            query: $query
            sortOrder: $sortOrder
          ) {
            pages
            items {
              name
              brand
              subType
              minPrice
              maxPrice
              #minUnitCost
              #maxUnitCost
              img
              vendors {
                name
                price
                link
                unitCost
                vendor
              }
            }
          }
        }
      `,
      variables() {
        // Use vue reactive properties here
        const that: any = this
        return {
          page: that.page,
          subType: that.subType || null,
          pageSize: that.pageSize,
          itemType: that.itemType || null,
          province: that.province || null,
          vendor: that.vendor || null,
          query: that.query || null,
          sortField: that.sortField || null,
          sortOrder: that.sortOrder || null,
        }
      },
      prefetch: ({ route }) => {
        const itemType = route.params.itemType || route.query.itemType || null
        if (![...ITEM_TYPES].includes(itemType)) {
          return false // hard 404
        }

        return {
          page: Number(route.query.page) || 1,
          subType: route.query.subType || route.query.calibre || null,
          pageSize: Number(route.query.pageSize) || 25,
          province: route.query.province || null,
          itemType,
          vendor: route.query.vendor || null,
          query: route.query.query || null,
          sortField: route.query.sortField || 'minPrice' || null,
          sorderOrder: route.query.sortOrder || 'DES' || null,
        }
      },
      watchLoading(isLoading /*, countModifier */) {
        const that: any = this // lazy ts
        if (that.$nuxt && that.$nuxt.$loading && that.$nuxt.$loading.start) {
          if (isLoading) {
            that.$nuxt.$loading.start()
          } else {
            that.$nuxt.$loading.finish()
          }
        }
      },
    },
  },
  components: {
    MyTable,
  },
  validate({ params }) {
    return [null, ...ITEM_TYPES].includes(params.itemType)
  },
  head() {
    const that: any = this
    const link: any[] = []
    const url = `https://ammobin.ca/${this.$i18n.locale !== 'en' ? this.$i18n.locale + '/' : ''}${that.itemType ||
      'ammo'}`
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
    return {
      title: (that.subType || that.itemType || 'Ammo') + ' Prices', // TODO: en francais
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The place to view the best ${that.subType ||
            that.itemType ||
            'ammo'} prices across ${that.province || 'Canada'}.`, // TODO: en francais
        },
      ],
      link,
    }
  },
})
export default class ListingPage extends Vue {
  error = null
  ammoListing = null

  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType as string)
  }
  get page() {
    return Number(this.$route.query.page) || 1
  }
  get subType() {
    // query was old param, dont want to break links
    return this.$route.query.subType || this.$route.query.calibre || null
  }
  get province() {
    return this.$route.query.province || null
  }
  get pageSize() {
    return Number(this.$route.query.pageSize) || 25
  }
  get itemType() {
    const itemType = this.$route.params.itemType || this.$route.query.itemType || null
    return itemType
  }
  get vendor() {
    return this.$route.query.vendor || null
  }
  get query() {
    return this.$route.query.query || null
  }
  get sortOrder() {
    return this.$route.query.sortOrder || 'DES' // null
  }
  get sortField() {
    return this.$route.query.sortField || 'minPrice'
  }
}
</script>
