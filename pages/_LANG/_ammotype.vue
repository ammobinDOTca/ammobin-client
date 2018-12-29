<template>
  <div class="container">
    <h1>{{$t('default.'+ (ammotype || 'ammo'))}}</h1>
    <my-table
      v-if="!error && ammoListings"
      v-bind:rows="ammoListings.items"
      :pages="ammoListings.pages"
      v-bind:ammotype="ammotype"
    ></my-table>
  </div>
</template>

<script lang="ts">
import MyTable from '~/components/my-table.vue'
import { getUrl, updateUrl } from '~/helpers'
import gql from 'graphql-tag'
const nop = () => {}
export default {
  validate({ params }) {
    console.log(params)
    return true
  },
  head() {
    const link: any[] = []
    const url = `https://ammobin.ca/${this.$i18n.locale !== 'en' ? this.$i18n.locale + '/' : ''}${this.ammotype ||
      'ammo'}`
    if (this.page > 1) {
      link.push({
        rel: 'prev',
        href: getUrl(url, this.page - 1, this.calibre),
      })
    }
    if (this.ammoListings && this.ammoListings.pages > this.page) {
      link.push({
        rel: 'next',
        href: getUrl(url, this.page + 1, this.calibre),
      })
    }
    console.log(link)
    return {
      title: (this.calibre || this.ammotype || 'Ammo') + ' Prices', //TODO: en francais
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The place to view the best ${this.calibre || this.ammotype || 'ammo'} prices across ${this
            .province || 'Canada'}.`, //TODO: en francais
        },
      ],
      link,
    }
  },
  apollo: {
    ammoListings: {
      query: gql`
        query getAmmoListings(
          $ammoType: AmmoType
          $page: Int
          $pageSize: Int
          $calibre: String
          $province: Province
          $vendor: String
          $query: String
          $sortField: SortField
          $sortOrder: SortOrder
        ) {
          ammoListings(
            ammoType: $ammoType
            page: $page
            pageSize: $pageSize
            calibre: $calibre
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
              calibre
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
          calibre: this.calibre || null,
          pageSize: this.pageSize,
          ammoType: this.ammotype || null,
          province: this.province || null,
          vendor: this.vendor || null,
          query: this.query || null,
          sortField: this.sortField || null,
          sortOrder: this.sortOrder || null,
        }
      },
      prefetch: ({ route }) => {
        return {
          page: Number(route.query.page) || 1,
          calibre: route.query.calibre || null,
          pageSize: Number(route.query.pageSize) || 25,
          province: route.query.province || null,
          ammoType: route.params.ammotype || route.query.ammotype || null,
          vendor: route.query.vendor || null,
          query: route.query.query || null,
          sortField: route.query.sortField || null,
          sorderOrder: route.query.sortOrder || null,
        }
      },
      watchLoading(isLoading, countModifier) {
        if (this.$nuxt && this.$nuxt.$loading && this.$nuxt.$loading.start) {
          if (isLoading) {
            this.$nuxt.$loading.start()
          } else {
            this.$nuxt.$loading.finish()
          }
        } else {
          console.log('no loading start/finish')
        }
      },
    },
  },
  data() {
    return {
      error: null,
    }
  },
  computed: {
    page() {
      return Number(this.$route.query.page) || 1
    },
    calibre() {
      return this.$route.query.calibre || null
    },
    province() {
      return this.$route.query.province || null
    },
    pageSize() {
      return Number(this.$route.query.pageSize) || 25
    },
    ammotype() {
      return this.$route.params.ammotype || this.$route.query.ammotype || null
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
}
</script>
