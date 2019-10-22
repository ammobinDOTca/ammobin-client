<template>
  <div class>
    <div class="pure-form pure-form-stacked">
      <div id="search" class="pure-u-1 pure-u-md-1-6">
        <label for="query">{{ $t('table.search') }}</label>
        <input
          id="query"
          :value="query"
          class="pure-input-1"
          placeholder="ie: Barnaul, surplus, 00 Buck"
          @change="updateQuery($event.target.value)"
        />
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="pageSize">{{ $t('table.pageSize') }}</label>
        <select id="pageSize" :value="pageSize" class="pure-input-1" @change="updatePageSize($event.target.value)">
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
      </div>
      <div v-if="isAmmoType" class="pure-u-1 pure-u-md-1-6">
        <label for="subRype">{{ $t('table.calibre') }}</label>

        <select id="subType" :value="subType" class="pure-input-1" @change="updateSubType($event.target.value)">
          <option />
          <optgroup v-if="showCenterfireCalibres" :label="$t('default.centerfire')">
            <option v-for="c in centerfireCalibres" :key="c">
              {{ c }}
            </option>
          </optgroup>
          <optgroup v-if="showRimfireCalibres" :label="$t('default.rimfire')">
            <option v-for="c in rimfireCalibres" :key="c">
              {{ c }}
            </option>
          </optgroup>
          <optgroup v-if="showShotgunGuages" :label="$t('default.shotgun')">
            <option v-for="c in shotgunGauges" :key="c">
              {{ c }}
            </option>
          </optgroup>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="province">{{ $t('table.province') }}</label>
        <select id="province" :value="province" class="pure-input-1" @change="updateProvince($event.target.value)">
          <option v-for="c in provinces" :key="c">
            {{ c }}
          </option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="vendor">{{ $t('table.vendor') }}</label>
        <select id="vendor" :value="vendor" class="pure-input-1" @change="updateVendor($event.target.value)">
          <option v-for="c in vendors" :key="c">
            {{ c }}
          </option>
        </select>
      </div>

      <div v-if="pages > 0" class="pure-u-1 pure-u-md-1-3">
        <label>{{ $t('table.page') }}</label>
        <div>
          <button class="pure-button button-xsmall" :disabled="page === 1" @click="updatePage(1)">
            |<<
          </button>
          <button class="pure-button button-xsmall" :disabled="page === 1" @click="updatePage(page - 1)">
            <
          </button>
          {{ page }} {{ $t('table.of') }} {{ pages }}
          <button class="pure-button button-xsmall" :disabled="page === pages" @click="updatePage(page + 1)">
            >
          </button>
          <button class="pure-button button-xsmall" :disabled="page === pages" @click="updatePage(pages)">
            >>|
          </button>
        </div>
      </div>
    </div>
    <div class="pure-g row">
      <div class="pure-u-lg-1-4 pure-u-1" />
      <div class="pure-u-lg-1-4 pure-u-1-4 title" :class="{ active: sortField == 'name' }" @click="sortBy('name')">
        <h4>
          {{ $t('table.name') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
      <div
        class="pure-u-lg-1-4 pure-u-1-4 title"
        :class="{ active: sortField == 'minPrice' }"
        @click="sortBy('minPrice')"
      >
        <h4>
          {{ $t('table.price') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
      <!--<div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        @click="sortBy('minUnitCost')"
        :class="{ active: sortField == 'minUnitCost' }"
      >
        <h4>
          {{ $t('table.unitCost') }}
          <span class="arrow" :class="sortOrder"></span>
        </h4>
      </div>-->
      <div class="pure-u-lg-1-4 pure-u-1-4 title" :class="{ active: sortField == 'link' }" @click="sortBy('link')">
        <h4>
          {{ $t('table.link') }}
          <span class="arrow" :class="sortOrder" />
        </h4>
      </div>
    </div>

    <div v-if="!rows || rows.length === 0" class="pure-g row fix-row">
      <div class="pure-u-1">
        {{ $t('table.noResult') }}
      </div>
    </div>

    <div v-for="(row, index) in rows" :key="row.name" class="pure-g row fix-row item">
      <div class="pure-u-lg-1-4 pure-u-md-1 pure-u-1">
        <img
          v-img-fallback="defaultImg"
          class="pure-img img-cell"
          :src="row.img || defaultImg"
          :alt="row.name"
          decoding="async"
          importance="low"
        />
      </div>
      <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">
        {{ row.name }}
      </div>
      <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1 m-b-1">
        <div v-if="row.minPrice !== row.maxPrice">${{ row.minPrice.toFixed(2) }} - ${{ row.maxPrice.toFixed(2) }}</div>
        <div v-else>${{ row.minPrice.toFixed(2) }}</div>
      </div>
      <!--<div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <div v-if="row.minUnitCost && row.minUnitCost !== row.maxUnitCost">
          ${{ row.minUnitCost.toFixed(2) }} - ${{ row.maxUnitCost.toFixed(2) }}
        </div>
        <div v-else-if="row.minUnitCost && row.minUnitCost === row.maxUnitCost">${{ row.minUnitCost.toFixed(2) }}</div>
        <div v-else if="!row.minUnitCost">N/A</div>
      </div>-->
      <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1 m-b-1">
        <button class="pure-button" @click="toggleVendors(row)">
          {{ showVendors[row.name] ? $t('table.hide') : $t('table.show') }} {{ $t('table.vendors') }}
        </button>
      </div>
      <div v-if="showVendors[row.name] === true" class="pure-u-1">
        <div v-for="v in row.vendors" :key="v.link" class="pure-g m-b-1">
          <div class="pure-u-lg-1-2 pure-u-md-1-4 pure-u-1-2">
            {{ v.name }}
          </div>
          <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1-4">${{ v.price.toFixed(2) }}</div>
          <!--<div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <span v-if="v.unitCost">({{ v.unitCost.toFixed(2) }} {{ $t('table.perRound') }})</span>
          </div>-->
          <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1-4">
            <a :href="v.link" target="_blank" rel="nofollow noopener" @click="itemClicked(v.link)"
              >{{ $t('table.buyFrom') }} {{ v.vendor }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="pages > 0" class="pure-u-lg-1-2 pure-u-1">
        <div>{{ $t('table.page') }}</div>
        <div>
          <button class="pure-button button-xsmall" :disabled="page === 1" @click="updatePage(1)">
            |<<
          </button>
          <button class="pure-button button-xsmall" :disabled="page === 1" @click="updatePage(page - 1)">
            <
          </button>
          {{ page }} {{ $t('table.of') }} {{ pages }}
          <button class="pure-button button-xsmall" :disabled="page === pages" @click="updatePage(page + 1)">
            >
          </button>
          <button class="pure-button button-xsmall" :disabled="page === pages" @click="updatePage(pages)">
            >>|
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { centerFireCalibres } from 'ammobin-classifier/build/centerfire-calibres'
import { rimfireCalibres } from 'ammobin-classifier/build/rimfire-calibres'
import { shotgunGauges } from 'ammobin-classifier/build/shotgun-gauges'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { AMMO_TYPES } from './constants'
declare const BASE_API_URL: string

@Component({})
export default class ItemsTable extends Vue {
  $route: any
  $axios: any

  @Prop() rows
  centerfireCalibres = centerFireCalibres.map(l => l[0].toUpperCase()).sort()
  rimfireCalibres = rimfireCalibres.map(l => l[0].toUpperCase()).sort()
  shotgunGauges = shotgunGauges.map(l => l[0].toUpperCase()).sort()
  provinces = [null, 'AB', 'BC', 'MB', 'NB', 'NS', 'NT', 'NL', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
  defaultImg = require('~/assets/blank.png')
  showVendors =
    this.rows
      .map(i => i.name)
      .reduce((sv, k) => {
        sv[k] = this.$store.state.isCrawler // show google all the results...
        return sv
      }, {}) || {}

  @Prop() pages
  @Prop() itemType
  @Prop() vendors
  @Watch('rows')
  onRowsChange() {
    this.showVendors =
      this.rows
        .map(i => i.name)
        .reduce((sv, k) => {
          sv[k] = this.$store.state.isCrawler // show google all the results...
          return sv
        }, {}) || {}
  }

  // is the current item type ammo ? (as opposed to reloading)
  get isAmmoType() {
    return AMMO_TYPES.includes(this.itemType)
  }
  get page() {
    return Number(this.$route.query.page) || 1
  }
  get subType() {
    return this.$route.query.subType || this.$route.query.calibre
  }
  get pageSize() {
    return Number(this.$route.query.pageSize) || 25
  }
  get province() {
    return this.$route.query.province
  }
  get vendor() {
    return this.$route.query.vendor
  }
  get query() {
    return this.$route.query.query
  }
  get sortField() {
    return this.$route.query.sortField || 'minPrice'
  }
  get sortOrder() {
    return this.$route.query.sortOrder || 'ASC'
  }
  get showCenterfireCalibres() {
    return !this.itemType || this.itemType === 'centerfire'
  }
  get showRimfireCalibres() {
    return !this.itemType || this.itemType === 'rimfire'
  }
  get showShotgunGuages() {
    return !this.itemType || this.itemType === 'shotgun'
  }
  itemClicked(link) {
    const click = JSON.stringify({
      link,
      href: window.location.href,
      query: this.$route.query,
      itemType: this.itemType,
      subType: this.subType,
    })
    if (!navigator.sendBeacon) {
      this.$axios.post(BASE_API_URL + 'track-click', click)
    } else {
      navigator.sendBeacon(BASE_API_URL + 'track-click', click)
    }
  }
  sortBy(key) {
    let sortOrder

    if (key === this.sortField) {
      if (this.sortOrder === 'DES') {
        sortOrder = 'ASC'
      } else {
        sortOrder = 'DES'
      }
    } else {
      sortOrder = 'DES'
    }

    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, {
        sortOrder,
        sortField: key,
      }),
    })
  }
  toggleVendors(row) {
    const { name, brand, subType } = row
    const open = !!this.showVendors[name]
    this.showVendors[name] = !open

    if (!open) {
      const view = JSON.stringify({
        subType,
        brand,
        href: window.location.href,
        query: this.$route.query,
        itemType: this.itemType,
      })

      if (!navigator.sendBeacon) {
        this.$axios.post(BASE_API_URL + 'track-view', view)
      } else {
        navigator.sendBeacon(BASE_API_URL + 'track-view', view)
      }
    }
  }
  updatePage(page) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { page }),
    })
    setImmediate(() => window.scroll(0, 0)) // scroll to top of page
  }
  updateSubType(subType) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { subType }),
    })
  }
  updatePageSize(pageSize) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { pageSize }),
    })
  }
  updateProvince(province) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { province }),
    })
  }
  updateVendor(vendor) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { vendor }),
    })
  }
  updateQuery(query) {
    this.$router.push({
      name: this.$route.name,
      query: Object.assign({}, this.$route.query, { query }),
    })
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
</style>
