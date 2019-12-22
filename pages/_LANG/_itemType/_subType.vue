<template>
  <div class="container">
    <div v-if="!isAmmoType">{{ $t('default.betaWarning') }}</div>
    <h1>{{ $t('subType.title', { area, subType }) }}</h1>
    <flat-list
      v-show="!error"
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
    />
    <div v-show="error">ERROR {{ error }}</div>
  </div>
</template>

<script lang="ts">
import FlatList from '~/components/flat-list.vue'
import { getUrl } from '~/helpers'
import { ITEM_TYPES, AMMO_TYPES } from '~/components/constants'
import '@nuxt/vue-app'
import { Component, Vue, Watch } from 'vue-property-decorator'
// import '~/types'
declare const BASE_API_URL: string

async function getShit(
  axios,
  {
    itemType,
    subType,
    page = 1,
    pageSize = 25,

    province = null,
    vendor = null,
    query = null,
    sortField = null,
    sortOrder = null,
  }
) {
  const f = await axios.post(BASE_API_URL + 'graphql', [
    {
      opName: 'getItemsFlatListings',
      query: `
      query getItemsFlatListings(
          $page: Int
          $pageSize: Int
          $itemType: ItemType
          $subType: String
          $province: Province
          $vendor: String
          $query: String
          $sortField: FlatSortField
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
      variables: {
        itemType,
        subType,
        page,
        pageSize,

        province,
        vendor,
        query,
        sortField,
        sortOrder,
      },
    },
    //{ query: '{vendors{name}}' },
  ])

  const {
    data: { itemsFlatListings, errors },
  } = f.data[0]

  return itemsFlatListings
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
  }) {
    const [itemsFlatListings, vendors] = await Promise.all([
      getShit($axios, {
        itemType,
        subType,
      }),
      // lazy, this should be cached...
      $axios
        .post(BASE_API_URL + 'graphql', [
          { query: '{vendors{name}}', opName: 'vendors' },
        ])
        .then(f => f.data[0].data.vendors),
    ])

    return {
      vendors,
      itemsFlatListings,
    }
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
  itemsFlatListings = null
  loading = false
  page = 1
  province: string = null
  pageSize = 25
  vendor: string = null
  query: string = null
  sortOrder: string = 'DES'
  sortField: string = 'price'

  get area() {
    return this.province || 'Canada'
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
  async onQueryChange(value, ...ass) {
    try {
      this.loading = true
      this.itemsFlatListings = await getShit(this.$axios, this)
      if (this.page > this.itemsFlatListings.pages) {
        this.page = this.itemsFlatListings.pages || 1
      }
      this.loading = false
    } catch (e) {
      this.error = e
    }
  }
}
</script>
