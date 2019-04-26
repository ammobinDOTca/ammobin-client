<template>
  <div class="container">
    <div v-if="!isAmmoType">{{ $t('default.betaWarning') }}</div>
    <h1>{{ $t('default.' + (itemType || 'ammo')) }}</h1>
    <my-table
      v-if="!error && itemsListings"
      v-bind:rows="itemsListings.items"
      :pages="itemsListings.pages"
      v-bind:itemType="itemType"
      v-bind:vendors="[null].concat(vendors.map(i => i.name))"
    ></my-table>
    <div v-if="error">ERROR {{ error }}</div>
    <div v-if="!itemsListings">{{ $t('default.loading') }}</div>
  </div>
</template>

<script lang="ts">
import MyTable from '~/components/my-table.vue'
import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES } from '~/components/constants'
import gql from 'graphql-tag'

export default {
  head() {
    const link: any[] = []
    const url = `https://ammobin.ca/${this.$i18n.locale !== 'en' ? this.$i18n.locale + '/' : ''}${this.itemType ||
      'ammo'}`
    if (this.page > 1) {
      link.push({
        rel: 'prev',
        href: getUrl(url, this.page - 1, this.subType),
      })
    }
    if (this.itemsListings && this.itemsListings.pages > this.page) {
      link.push({
        rel: 'next',
        href: getUrl(url, this.page + 1, this.subType),
      })
    }
    return {
      title: (this.subType || this.itemType || 'Ammo') + ' Prices', //TODO: en francais
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The place to view the best ${this.subType || this.itemType || 'ammo'} prices across ${this
            .province || 'Canada'}.`, //TODO: en francais
        },
      ],
      link,
    }
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
              minUnitCost
              maxUnitCost
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
        return {
          page: this.page,
          subType: this.subType || null,
          pageSize: this.pageSize,
          itemType: this.itemType || null,
          province: this.province || null,
          vendor: this.vendor || null,
          query: this.query || null,
          sortField: this.sortField || null,
          sortOrder: this.sortOrder || null,
        }
      },
      prefetch: ({ route }) => {
        let itemType = route.params.itemType || route.query.itemType || null
        // todo: fix this
        if (false && ![ITEM_TYPES].includes(itemType)) {
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
          sortField: route.query.sortField || null,
          sorderOrder: route.query.sortOrder || null,
        }
      },
      watchLoading(isLoading /*, countModifier*/) {
        if (this.$nuxt && this.$nuxt.$loading && this.$nuxt.$loading.start) {
          if (isLoading) {
            this.$nuxt.$loading.start()
          } else {
            this.$nuxt.$loading.finish()
          }
        }
      },
    },
  },
  data() {
    return {
      error: null,
      ammoListing: null,
    }
  },
  computed: {
    isAmmoType() {
      return AMMO_TYPES.includes(this.itemType)
    },
    page() {
      return Number(this.$route.query.page) || 1
    },
    subType() {
      // query was old param, dont want to break links
      return this.$route.query.subType || this.$route.query.calibre || null
    },
    province() {
      return this.$route.query.province || null
    },
    pageSize() {
      return Number(this.$route.query.pageSize) || 25
    },
    itemType() {
      let itemType = this.$route.params.itemType || this.$route.query.itemType || null
      return itemType
    },
    vendor() {
      return this.$route.query.vendor || null
    },
    query() {
      return this.$route.query.query || null
    },
    sortOrder() {
      return this.$route.query.sortOrder || null
    },
    sortField() {
      return this.$route.query.sortField || null
    },
  },
  components: {
    MyTable,
  },
  validate({ params }) {
    // todo: use proper const here + reloading
    return true || [null, ...ITEM_TYPES].includes(params.itemType)
  },
}
</script>
