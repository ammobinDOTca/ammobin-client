<template>
  <div class="">
    <div class="pure-form pure-form-stacked">
      <div id="search" class="pure-u-1 pure-u-md-1-6">
        <label>{{$t('table.search')}}</label>
        <input name="query" v-model="searchQuery" class="pure-input-1" placeholder="ie: Barnaul, surplus, 00 Buck">
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="pageSize"> {{$t('table.pageSize')}}</label>
        <select id="pageSize" :value="pageSize" @change="updatePageSize($event.target.value)" class="pure-input-1">
          <option >25</option>
          <option >50</option>
          <option >75</option>
          <option >100</option>
        </select>
      </div>
      <div class="pure-u-1 pure-u-md-1-6">
        <label for="calibre"> {{$t('table.calibre')}}</label>
        <select id="calibre" :value="calibre" @change="updateCalibre($event.target.value)" class="pure-input-1">
          <option v-for="c in calibres" :key="c">{{c}}</option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="province">{{$t('table.province')}}</label>
        <select id="province" v-model="province" class="pure-input-1">
          <option v-for="c in provinces" :key="c">{{c}}</option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="vendor">{{$t('table.vendor')}}</label>
        <select id="vendor" v-model="vendor" class="pure-input-1">
          <option v-for="c in vendors" :key="c">{{c}}</option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-3">
        <label>
          {{$t('table.page')}}
        </label>
        <div>
          <button @click="updatePage(1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            |<<
          </button>
          <button @click="updatePage(page - 1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            <
          </button>
          {{page}} {{$t('table.of')}} {{pages}}
          <button @click="updatePage(page+1)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            >
          </button>
          <button @click="updatePage( pages)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            >>|
          </button>
        </div>
      </div>
    </div>
    <div class="pure-g row">
      <div class="pure-u-lg-1-5 pure-u-1"></div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('name')" :class="{ active: sortKey == 'name' }">
        <h4>{{$t('table.name')}}
          <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('minPrice')" :class="{ active: sortKey == 'minPrice' }">
        <h4>{{$t('table.price')}}
          <span class="arrow" :class="sortOrders['minPrice'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('minUnitCost')" :class="{ active: sortKey == 'minUnitCost' }">
        <h4>{{$t('table.unitCost')}}
          <span class="arrow" :class="sortOrders['minUnitCost'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('link')" :class="{ active: sortKey == 'link' }">
        <h4>{{$t('table.link')}}
          <span class="arrow" :class="sortOrders['link'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
    </div>

    <div v-if="filteredRows.length === 0" class="pure-g row fix-row">
      <div class="pure-u-1"> {{$t('table.noResult')}}</div>
    </div>

    <div v-for="(row, index) in filteredRows" :key="row.name" class="pure-g row fix-row item">
      <div class="pure-u-lg-1-5 pure-u-md-1 pure-u-1">
        <img class="pure-img img-cell" v-bind:src="row.img || defaultImg" v-img-fallback="defaultImg" :alt="row.name" />
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">
        {{row.name}}
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 ">
        <div v-if="row.minPrice !== row.maxPrice">
          ${{row.minPrice.toFixed(2)}} - ${{row.maxPrice.toFixed(2)}}
        </div>
        <div v-else>
          ${{row.minPrice}}
        </div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <div v-if="row.minUnitCost && row.minUnitCost !== row.maxUnitCost">
          ${{ row.minUnitCost.toFixed(2) }} - ${{ row.maxUnitCost.toFixed(2) }}
        </div>
        <div v-else-if=" row.minUnitCost && row.minUnitCost === row.maxUnitCost">
          ${{row.minUnitCost}}
        </div>
        <div v-else if="!row.minUnitCost">
          N/A
        </div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4  pure-u-1 m-b-1">
        <button class="pure-button" @click="toggleVendors(row.name, row)">
          {{showVendors[row.name]? $t('table.hide') : $t('table.show')}} {{$t('table.vendors')}}
        </button>
      </div>
      <div class="pure-u-1" v-if="showVendors[row.name] === true">
        <div v-for="v in row.vendors" :key="v.link" class="pure-g m-b-1">
          <div class="pure-u-lg-2-5 pure-u-md-1-4 pure-u-2-5 ">
            {{v.name}}
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            ${{v.price.toFixed(2)}}
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <span v-if="v.unitCost">({{(v.unitCost).toFixed(2)}} {{$t('table.perRound')}})</span>
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <a v-bind:href="v.link" target="_blank" rel="nofollow noopener">{{$t('table.buyFrom')}} {{v.vendor}}</a>
          </div>
        </div>

      </div>
    </div>
    <div>
      <div class="pure-u-lg-1-2 pure-u-1">
        <div>
          {{$t('table.page')}}
        </div>
        <div>
          <button @click="updatePage(1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            |<<
          </button>
          <button @click="updatePage(page - 1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            <
          </button>
          {{page}} {{$t('table.of')}} {{pages}}
          <button @click="updatePage(page+1)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            >
          </button>
          <button @click="updatePage( pages)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            >>|
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare const BASE_API_URL: string
export default {
  data: () => ({
    // default page size
    searchQuery: '',
    sortKey: 'minUnitCost',
    sortedListLength: -1,
    sortOrders: {
      name: 1,
      link: 1,
      minPrice: 1,
      minUnitCost: 1,
    },
    province: null,
    showVendors: {},
    provinces: [null, 'AB', 'BC', 'MB', 'NB', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
    vendor: null,
    defaultImg: require('~/assets/blank.png'),
  }),
  props: ['rows', 'pages', 'calibres'],
  computed: {
    page() {
      return Number(this.$route.query.page) || 1
    },
    calibre() {
      return this.$route.query.calibre
    },
    pageSize() {
      return Number(this.$route.query.pageSize) || 25
    },
    vendors() {
      if (!this.rows) {
        return []
      }
      return Object.keys(
        this.rows.reduce(
          (list, row) => {
            row.vendors.forEach(i => (list[i.vendor] = true))
            return list
          },
          { '': true }
        )
      ).sort()
    },
    // apply filters + sorting + pagination to results
    filteredRows() {
      let data = JSON.parse(JSON.stringify(this.rows && this.rows.length ? this.rows : [])) // super fancy deep list of objects
      let sortKey = this.sortKey
      let order = this.sortOrders[sortKey]

      // filter by name
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        // data = data.filter(r => (r.name &&
        //   r.name.toLowerCase().indexOf(q) >= 0));
        data = data
          .map(d => {
            d.vendors = d.vendors.filter(r => r.name && r.name.toLowerCase().indexOf(q) >= 0)
            return d
          })
          .filter(f => f.vendors && f.vendors.length)
      }

      // filter by province
      if (this.province) {
        data = data
          .map(d => {
            d.vendors = d.vendors.filter(r => r.province && r.province.indexOf(this.province) >= 0)
            return d
          })
          .filter(f => f.vendors && f.vendors.length)
      }

      // filter by vendor
      if (this.vendor) {
        data = data
          .map(d => {
            d.vendors = d.vendors.filter(r => r.vendor && r.vendor.indexOf(this.vendor) >= 0)
            return d
          })
          .filter(f => f.vendors && f.vendors.length)
      }

      if (sortKey) {
        data = data.sort(function(a, b) {
          let aa = a[sortKey]
          let bb = b[sortKey]
          // put unknown unit costs at the bottom of the sort order
          if (sortKey === 'minUnitCost') {
            if (aa <= 0) {
              aa = Number.MAX_SAFE_INTEGER
            }
            if (bb <= 0) {
              bb = Number.MAX_SAFE_INTEGER
            }
          }

          if (aa === bb) {
            return 0
          } else if (aa > bb) {
            return 1 * order
          } else {
            return -1 * order
          }
        })
        data = data.map(row => {
          row.vendors = row.vendors.sort(function(a, b) {
            let groupedKey
            switch (sortKey) {
              case 'minUnitCost':
                groupedKey = 'unitCost'
                break
              case 'name':
                groupedKey = 'name'
                break
              case 'minPrice':
                groupedKey = 'price'
                break
              case 'link':
                groupedKey = 'vendor'
                break
              default:
                console.error('unhandled sort key', sortKey)
            }

            let aa = a[groupedKey]
            let bb = b[groupedKey]
            // put unknown unit costs at the bottom of the sort order
            if (groupedKey === 'unitCost') {
              if (aa <= 0) {
                aa = Number.MAX_SAFE_INTEGER
              }
              if (bb <= 0) {
                bb = Number.MAX_SAFE_INTEGER
              }
            }

            if (aa === bb) {
              return 0
            } else if (aa > bb) {
              return 1 * order
            } else {
              return -1 * order
            }
          })
          return row
        })
      }

      this.sortedListLength = data.length // gross side effect. but lets us know how many pages of data there are
      this.showVendors = data.map(i => i.name).reduce((sv, k) => {
        sv[k] = this.$store.state.isCrawler // show google all the results...
        return sv
      }, {})

      return data
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    toggleVendors(name, row) {
      const open = !!this.showVendors[name]

      if (!open) {
        const view = JSON.stringify({
          calibre: row.calibre,
          brand: row.brand,
        })

        if (!navigator.sendBeacon) {
          this.$axios.post(BASE_API_URL + 'track-view', view)
        } else {
          navigator.sendBeacon(BASE_API_URL + 'track-view', view)
        }
      }

      this.showVendors[name] = !open
    },
    updatePage(page) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { page }),
      })
      setImmediate(() => window.scroll(0, 0)) //scroll to top of page
    },
    updateCalibre(calibre) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { calibre }),
      })
    },
    updatePageSize(pageSize) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { pageSize }),
      })
    },
  },
}
</script>

<style>
.title {
  color: darkgray;
}

.fill {
  width: 100%;
}

.img-cell {
  max-width: 160px;
  max-height: 160px;
  padding: 5px;
  display: block;
  margin: auto;
}

.row {
  align-items: center;
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
  padding-bottom: 10px;
}

.fix-row {
  min-height: 107px;
  align-content: center;
}

.active {
  color: black;
}

.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
}

.m-b-1 {
  margin-bottom: 5px;
}

.capitalize {
  text-transform: capitalize;
}

.item {
  min-height: 171px;
}
</style>
