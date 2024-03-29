<template>
  <div class="container">
    <div v-if="!isAmmoType">{{ $t('default.betaWarning') }}</div>
    <h1>{{ $t('subType.title', { area, subType }) }}</h1>
    <div class="pure-g row">
      <sponsorship />
    </div>
    <flat-list
      v-if="!error"
      :rows="itemsFlatListings ? itemsFlatListings.items : []"
      :pages="itemsFlatListings ? itemsFlatListings.pages : 0"
      :item-type="itemType"
      :subType="subType"
      :vendors="[null].concat((vendors || []).map(i => i.name))"
      :loading="!itemsFlatListings || loading"
      :page.sync="page"
      :pageSize.sync="pageSize"
      :province.sync="province"
      :vendor.sync="vendor"
      :query.sync="query"
      :sortField.sync="sortField"
      :sortOrder.sync="sortOrder"
      :brand.sync="brand"
    />
    <div v-show="error">ERROR {{ error }}</div>
  </div>
</template>

<script lang="ts">
import FlatList from '~/components/flat-list.vue'
import Sponsorship from '~/components/sponsorship.vue'
import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES } from '~/components/constants'
// import '@nuxt/vue-app'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getCountry } from '~/helpers'
// import '~/types'

declare const BASE_API_URL: string
declare const DOMAIN: string
declare const BASE_URL: string
declare const NITRO_PRESET: string

async function getShit(
  axios,
  {
    itemType,
    subType,
    page = 1,
    pageSize = 25,
    brand = null,
    province = null,
    vendor = null,
    query = null,
    sortField = 'unitCost',
    sortOrder = 'ASC',
  }
) {
  function format(s) {
    return s ? '"' + s + '"' : 'null'
  }
  const f = await axios.get(BASE_API_URL + 'graphql', {
    params: {
      query: `{
itemsFlatListings(
 page: ${page}
 itemType: ${itemType}
 subType: "${subType}"
 brand:${format(brand)}
 province:${format(province)}
 vendor:${format(vendor)}
 query:${format(query)}
 sortField:${sortField}
 sortOrder:${sortOrder}
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
}`,
      opName: 'getItemsFlatListings',
      variables: {
        itemType,
        subType,
        page,
        pageSize,
        brand,
        province,
        vendor,
        query,
        sortField,
        sortOrder,
      },
    },
  })

  const {
    data: { itemsFlatListings, errors },
  } = f.data

  return itemsFlatListings
}

async function getShitFetch(
  fetch,
  {
    itemType,
    subType,
    page = 1,
    pageSize = 25,
    brand = null,
    province = null,
    vendor = null,
    query = null,
    sortField = 'unitCost',
    sortOrder = 'ASC',
  }
) {
  function format(s) {
    return s ? '"' + s + '"' : 'null'
  }
  const url = new URL(BASE_API_URL + 'graphql')
  url.searchParams.set(
    'query',
    `{
itemsFlatListings(
 page: ${page}
 itemType: ${itemType}
 subType: "${subType}"
 brand:${format(brand)}
 province:${format(province)}
 vendor:${format(vendor)}
 query:${format(query)}
 sortField:${sortField}
 sortOrder:${sortOrder}
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
}`
  )
  url.searchParams.set('opName', 'getItemsFlatListings')
  url.searchParams.set(
    'variables',
    JSON.stringify({
      itemType,
      subType,
      page,
      pageSize,
      brand,
      province,
      vendor,
      query,
      sortField,
      sortOrder,
    })
  )
  return fetch(url.toString(), { method: 'GET' })
    .then(f => f.json())
    .then(f => f.data.itemsFlatListings)
}

@Component({
  validate({ params }) {
    return ITEM_TYPES.includes(params.itemType)
  },
  async asyncData({
    $axios,
    route: {
      params: { itemType, subType },
      // todo: figure out generate issues before respecting query params
      // query: { page, pageSize, province, vendor, query, sortField, sortOrder },
    },
    error,
    ...rest
  }) {
    try {
      if (NITRO_PRESET === 'cloudflare') {
        // todo - use fetch instead ? use nuxt3 thing fetch
        const url = new URL(BASE_API_URL + `graphql`)
        url.searchParams.set('query', '{vendors{name}}')
        url.searchParams.set('opName', 'vendors')
        const [itemsFlatListings, vendors] = await Promise.all([
          getShitFetch(fetch, {
            itemType,
            subType,
          }),

          fetch(url.toString(), {
            method: 'GET',
          })
            .then(f => f.json())
            .then(f => f.data.vendors),
        ])
        return {
          vendors,
          itemsFlatListings,
        }
      } else {
        const [itemsFlatListings, vendors] = await Promise.all([
          getShit($axios, {
            itemType,
            subType,
          }),
          // lazy, this should be cached...
          $axios
            .get(BASE_API_URL + 'graphql', {
              params: {
                query: '{vendors{name}}',
                opName: 'vendors',
              },
            })
            .then(f => f.data.data.vendors),
        ])

        return {
          vendors,
          itemsFlatListings,
        }
      }
    } catch (e) {
      console.error('asyncData ERROR', e, e.config)

      if (e.response) {
        error({
          message: `message ${e.message}
          url:${e?.config.url}
          params:${JSON.stringify(e?.config.params || 'empty params')}
          body:${JSON.stringify(e?.response.data || 'empty body')}`,
          statusCode: e.response.status,
        })
      } else if (e.request) {
        error({
          message: `clientside network error message: ${e.message} `,
          statusCode: 0,
        })
      } else {
        error({
          message: `clientside error message: ${e.message} `,
          statusCode: 0,
        })
      }

      return {
        error: e,
      }
    }
  },
  components: {
    FlatList,
    Sponsorship,
  },
  head() {
    const that: any = this
    const link: any[] = []
    const url = `${BASE_URL}/${this.$i18n.locale}/${that.itemType}/${that.subType}`
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
      title: this.$t('subType.title', { area, subType }) + ` | ${DOMAIN}`,
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
  itemsFlatListings = null
  loading = false
  page = 1
  province: string = null
  pageSize = 25
  vendor: string = null
  query: string = null
  sortOrder: string = 'ASC'
  sortField: string = 'unitCost'
  brand: string = null

  get area() {
    return this.province || getCountry()
  }
  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType as string)
  }
  get subType() {
    // query was old param, dont want to break links
    return this.$route.params.subType
  }
  get itemType() {
    return this.$route.params.itemType
  }

  @Watch('page')
  @Watch('province')
  @Watch('pageSize')
  @Watch('vendor')
  @Watch('query')
  @Watch('sortOrder')
  @Watch('sortField')
  @Watch('brand')
  async onQueryChange(value, ...ass) {
    this.$nuxt.$loading.start()
    try {
      this.loading = true
      this.itemsFlatListings = await getShit(this.$axios, this)
      if (this.page > this.itemsFlatListings.pages) {
        this.page = this.itemsFlatListings.pages || 1
      }
    } catch (e) {
      console.error('onQueryChange ERROR', e)
      this.error = e
    }
    this.loading = false
    this.$nuxt.$loading.finish()
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
