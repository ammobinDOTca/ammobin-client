<template>
  <div class>
    <div class="pure-form pure-form-stacked">
      <div class="pure-g">
        <div id="search" class="pure-u-1 pure-u-md-1-3">
          <label for="query">{{ $t('table.search') }}</label>
          <input
            id="query"
            :value="query"
            class="pure-input-1"
            placeholder="ie: Barnaul, surplus, 00 Buck"
            @change="updateQuery($event.target.value)"
            :disabled="loading"
          />
        </div>
        <div class="pure-u-1 show-on-mobile">
          <div @click="toggleFilters()" class="active pure-button button-xsmall">
            {{ $t(!showFilters ? 'table.showFilters' : 'table.hideFilters') }}
            <span class="arrow" :class="{ DES: !showFilters, ASC: showFilters }"></span>
          </div>
        </div>
        <div class="pure-u-1 pure-u-md-2-3" v-show="showFilters">
          <!--<div class="pure-u-1 pure-u-md-1-4">
            <label for="pageSize">{{ $t('table.pageSize') }}</label>
            <select
              id="pageSize"
              :value="pageSize"
              class="pure-input-1"
              @change="updatePageSize($event.target.value)"
              :disabled="loading"
            >
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>-->

          <div class="pure-u-1 pure-u-md-1-4">
            <label for="province">{{ $t('table.province') }}</label>
            <select
              id="province"
              :value="province"
              class="pure-input-1"
              @change="updateProvince($event.target.value)"
              :disabled="loading"
            >
              <option v-for="c in provinces" :key="c">{{ c }}</option>
            </select>
          </div>

          <div class="pure-u-1 pure-u-md-1-3">
            <label for="vendor">{{ $t('table.vendor') }}</label>
            <select
              id="vendor"
              :value="vendor"
              class="pure-input-1"
              @change="updateVendor($event.target.value)"
              :disabled="loading"
            >
              <option v-for="c in vendors" :key="c">{{ c }}</option>
            </select>
          </div>

          <div class="pure-u-1 pure-u-md-1-3 capitalize">
            <label for="brand">{{ $t('table.brand') }}</label>
            <select
              id="brand"
              :value="brand"
              class="pure-input-1"
              @change="updateBrand($event.target.value)"
              :disabled="loading"
            >
              <option v-for="c in brands" :key="c" class="capitalize">{{ c }}</option>
            </select>
          </div>
        </div>
      </div>
      <div v-show="pages > 0" class="pure-u-1 pure-u-md-1-3">
        <label>{{ $t('table.page') }}</label>
        <div>
          <button class="pure-button button-xsmall" :disabled="page <= 1 || loading" @click="updatePage(1)">|<<</button>
          <button class="pure-button button-xsmall" :disabled="page <= 1 || loading" @click="updatePage(page - 1)">
            <
          </button>
          {{ page }} {{ $t('table.of') }} {{ pages }}
          <button class="pure-button button-xsmall" :disabled="page >= pages || loading" @click="updatePage(page + 1)">
            >
          </button>
          <button class="pure-button button-xsmall" :disabled="page >= pages || loading" @click="updatePage(pages)">
            >>|
          </button>
        </div>
      </div>
    </div>
    <div class="pure-g row">
      <div class="pure-u-lg-1-5 pure-u-1" />
      <div
        class="pure-u-lg-1-5 pure-u-md-1-3 pure-u-1-4 title"
        :class="{ active: sortField == 'name' }"
        @click="sortBy('name')"
        :disabled="loading"
      >
        <h4>
          {{ $t('table.name') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-md-1-3 pure-u-1-4 title"
        :class="{ active: sortField == 'price' }"
        :disabled="loading"
        @click="sortBy('price')"
      >
        <h4>
          {{ $t('table.price') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        :disabled="loading"
        @click="sortBy('unitCost')"
        :class="{ active: sortField == 'unitCost' }"
      >
        <h4>
          {{ $t('table.unitCost') }}
          <span class="arrow" :class="sortOrder"></span>
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        :disabled="loading"
        :class="{ active: sortField == 'link' }"
        @click="sortBy('link')"
      >
        <h4>
          {{ $t('table.link') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
    </div>

    <div v-show="!loading && (!rows || rows.length === 0)" class="pure-g row fix-row">
      <div class="pure-u-1">{{ $t('table.noResult') }}</div>
    </div>

    <div v-show="loading" class="pure-g row fix-row">
      <div class="pure-u-1">{{ $t('default.loading') }}...</div>
    </div>
    <div v-show="!loading">
      <div v-for="(row, index) in rows" :key="row.link + index" class="pure-g row fix-row item">
        <div class="pure-u-lg-1-5 pure-u-md-1 pure-u-1">
          <img
            v-img-fallback="defaultImg"
            class="pure-img img-cell"
            :src="row.img || defaultImg"
            :alt="row.name"
            decoding="async"
            importance="low"
          />
        </div>
        <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">{{ row.name }}</div>
        <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
          <div>${{ row.price.toFixed(2) }}</div>
        </div>
        <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
          <div v-if="row.unitCost">${{ row.unitCost.toFixed(2) }}</div>
          <div v-else if="!row.minUnitCost">N/A</div>
        </div>
        <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
          <a :href="row.link" target="_blank" rel="nofollow noopener" @click="itemClicked(row.link, index)"
            >{{ $t('table.buyFrom') }} {{ row.vendor }}</a
          >
        </div>
      </div>
    </div>
    <div>
      <div v-show="pages > 0" class="pure-u-lg-1-2 pure-u-1">
        <div>{{ $t('table.page') }}</div>
        <div>
          <button class="pure-button button-xsmall" :disabled="page === 1 || loading" @click="updatePage(1)">
            |<<
          </button>
          <button class="pure-button button-xsmall" :disabled="page === 1 || loading" @click="updatePage(page - 1)">
            <
          </button>
          {{ page }} {{ $t('table.of') }} {{ pages }}
          <button class="pure-button button-xsmall" :disabled="page === pages || loading" @click="updatePage(page + 1)">
            >
          </button>
          <button class="pure-button button-xsmall" :disabled="page === pages || loading" @click="updatePage(pages)">
            >>|
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { AMMO_TYPES } from './constants'
import { brands } from 'ammobin-classifier'
declare const BASE_API_URL: string

@Component({
  mounted: function() {
    this.showFilters = process.browser && window.outerWidth >= 759
  },
})
export default class FlatList extends Vue {
  $route: any
  $axios: any

  showFilters: boolean = true

  @Prop() rows
  provinces = [null, 'AB', 'BC', 'MB', 'NB', 'NS', 'NL', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
  defaultImg = require('~/assets/blank.png')

  brands = [null, ...brands.map(l => l[0]).sort(), 'UNKNOWN']

  @Prop() pages
  @Prop() itemType
  @Prop() vendors
  @Prop() loading
  @Prop() page // = 1
  @Prop() subType
  @Prop() pageSize // =25
  @Prop() province
  @Prop() vendor
  @Prop() query
  @Prop() sortField //= 'minPrice'
  @Prop() sortOrder // = 'ASC'
  @Prop() brand
  // is the current item type ammo ? (as opposed to reloading)
  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType)
  }

  /**
   * track outbound link click
   * link = url
   * index = position in page
   */
  itemClicked(link, index) {
    const click = JSON.stringify({
      link,
      index,
      href: window.location.href,
      query: {
        itemType: this.itemType,
        subType: this.subType,
        page: this.page,
        pageSize: this.pageSize,
        province: this.province,
        vendor: this.vendor,
        query: this.query,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        brand: this.brand,
      },
      itemType: this.itemType,
      subType: this.subType,
      page: this.page,
    })
    if (!navigator.sendBeacon) {
      this.$axios.post(BASE_API_URL + 'track-click', click)
    } else {
      navigator.sendBeacon(BASE_API_URL + 'track-click', click)
    }
  }
  sortBy(newSortField) {
    let sortOrder

    if (newSortField === this.sortField) {
      if (this.sortOrder === 'DES') {
        sortOrder = 'ASC'
      } else {
        sortOrder = 'DES'
      }
    } else {
      sortOrder = 'DES'
    }
    this.$emit('update:sortOrder', sortOrder)
    this.$emit('update:sortField', newSortField)
  }
  updateBrand(brand) {
    this.$emit('update:brand', brand)
  }
  updatePage(page) {
    this.$emit('update:page', page)
    setImmediate(() => window.scroll(0, 0)) // scroll to top of page
  }
  updatePageSize(pageSize) {
    this.$emit('update:pageSize', parseInt(pageSize))
  }
  updateProvince(province) {
    this.$emit('update:province', province ? province : null)
  }
  updateVendor(vendor) {
    this.$emit('update:vendor', vendor)
  }
  updateQuery(query) {
    this.$emit('update:query', query)
  }
  toggleFilters() {
    this.showFilters = !this.showFilters
  }
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

.active .arrow.ASC {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
}

.active .arrow.DES {
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
  padding-bottom: 15px;
  padding-top: 15px;
}

.show-on-mobile {
  display: none;
}

@media only screen and (max-width: 759px) {
  .show-on-mobile {
    display: block;
  }
}
</style>
