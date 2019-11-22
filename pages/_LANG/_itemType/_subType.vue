<template>
  <div class="container">
    <div v-if="!isAmmoType">{{ $t('default.betaWarning') }}</div>
    <h1>{{ $t('subType.title', { area, subType }) }}</h1>
    <flat-list
      v-show="!error && itemsFlatListings"
      :rows="itemsFlatListings ? itemsFlatListings.items : []"
      :pages="itemsFlatListings ? itemsFlatListings.pages : 0"
      :item-type="itemType"
      :vendors="[null].concat(vendors.map(i => i.name))"
    />
    <div v-show="error">ERROR {{ error }}</div>
    <div v-show="!itemsFlatListings">{{ $t('default.loading') }}</div>
  </div>
</template>

<script lang="ts">
import FlatList from '~/components/flat-list.vue'
import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES } from '~/components/constants'
import gql from 'graphql-tag'
import '@nuxt/vue-app'
import { Component, Vue } from 'vue-property-decorator'
// import '~/types'

@Component({
  validate({ params }) {
    return ITEM_TYPES.includes(params.itemType)
  },
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
    itemsFlatListings: {
      query: gql`
        query getItemsFlatListings(
          $page: Int
          $pageSize: Int
          $itemType: ItemType
          $subType: String
          $province: Province
          $vendor: String
          $query: String
          $sortField: SortField
          $sortOrder: SortOrder
        ) {
          itemsFlatListings(
            page: $page
            pageSize: $pageSize
            itemType: $itemType
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
              img
              price
              link
              unitCost
              vendor
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
          itemType: that.itemType,

          province: that.province || null,
          vendor: that.vendor || null,
          query: that.query || null,
          sortField: that.sortField || null,
          sortOrder: that.sortOrder || null,
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
    FlatList,
  },
  head() {
    const that: any = this
    const link: any[] = []
    const url = `https://ammobin.ca/${this.$i18n.locale}/${that.itemType}/${that.subType}`
    if (that.page > 1) {
      link.push({
        rel: 'prev',
        href: getUrl(url, that.page - 1, that.subType),
      })
    }
    if (that.itemsFlatListings && that.itemsFlatListings.pages > that.page) {
      link.push({
        rel: 'next',
        href: getUrl(url, that.page + 1, that.subType),
      })
    }
    const area = that.area
    const subType = that.subType
    return {
      title: this.$t('subType.title', { area, subType }) + ' | ammobin.ca',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('subType.description', { area, subType }),
        },
      ],
      link,
    }
  },
})
export default class ListingPage extends Vue {
  error = null
  ammoListing = null

  get area() {
    return this.province || 'Canada'
  }

  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType as string)
  }
  get page() {
    return Number(this.$route.query.page) || 1
  }
  get subType() {
    // query was old param, dont want to break links
    return this.$route.params.subType
  }
  get province() {
    return this.$route.query.province || null
  }
  get pageSize() {
    return Number(this.$route.query.pageSize) || 25
  }
  get itemType() {
    return this.$route.params.itemType
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
