<template>
  <div class>
    <div class="pure-form pure-form-stacked">
      <div id="search" class="pure-u-1 pure-u-md-1-6">
        <label for="query">{{$t('table.search')}}</label>
        <input
          name="query"
          :value="query"
          @change="updateQuery($event.target.value)"
          class="pure-input-1"
          placeholder="ie: Barnaul, surplus, 00 Buck"
        >
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="pageSize">{{$t('table.pageSize')}}</label>
        <select
          id="pageSize"
          :value="pageSize"
          @change="updatePageSize($event.target.value)"
          class="pure-input-1"
        >
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
      </div>
      <div class="pure-u-1 pure-u-md-1-6">
        <label for="calibre">{{$t('table.calibre')}}</label>

        <select
          name="calibre"
          :value="calibre"
          @change="updateCalibre($event.target.value)"
          class="pure-input-1"
        >
          <option></option>
          <optgroup :label="$t('default.centerfire')" v-if="showCenterfireCalibres">
            <option v-for="c in centerfireCalibres" :key="c">{{c}}</option>
          </optgroup>
          <optgroup :label="$t('default.rimfire')" v-if="showRimfireCalibres">
            <option v-for="c in rimfireCalibres" :key="c">{{c}}</option>
          </optgroup>
          <optgroup :label="$t('default.shotgun')" v-if="showShotgunGuages">
            <option v-for="c in shotgunGauges" :key="c">{{c}}</option>
          </optgroup>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="province">{{$t('table.province')}}</label>
        <select
          id="province"
          :value="province"
          @change="updateProvince($event.target.value)"
          class="pure-input-1"
        >
          <option v-for="c in provinces" :key="c">{{c}}</option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-6">
        <label for="vendor">{{$t('table.vendor')}}</label>
        <select
          id="vendor"
          :value="vendor"
          @change="updateVendor($event.target.value)"
          class="pure-input-1"
        >
          <option v-for="c in vendors" :key="c">{{c}}</option>
        </select>
      </div>

      <div class="pure-u-1 pure-u-md-1-3">
        <label>{{$t('table.page')}}</label>
        <div>
          <button
            @click="updatePage(1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === 1"
          >|<<</button>
          <button
            @click="updatePage(page - 1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === 1"
          ><</button>
          {{page}} {{$t('table.of')}} {{pages}}
          <button
            @click="updatePage(page+1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === pages"
          >></button>
          <button
            @click="updatePage( pages)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === pages"
          >>>|</button>
        </div>
      </div>
    </div>
    <div class="pure-g row">
      <div class="pure-u-lg-1-5 pure-u-1"></div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        @click="sortBy('name')"
        :class="{ active: sortField == 'name' }"
      >
        <h4>
          {{$t('table.name')}}
          <span class="arrow" :class="sortOrder"></span>
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        @click="sortBy('minPrice')"
        :class="{ active: sortField == 'minPrice' }"
      >
        <h4>
          {{$t('table.price')}}
          <span
            class="arrow"
            :class="sortOrder"
          ></span>
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        @click="sortBy('minUnitCost')"
        :class="{ active: sortField == 'minUnitCost' }"
      >
        <h4>
          {{$t('table.unitCost')}}
          <span
            class="arrow"
            :class="sortOrder"
          ></span>
        </h4>
      </div>
      <div
        class="pure-u-lg-1-5 pure-u-1-4 title"
        @click="sortBy('link')"
        :class="{ active: sortField == 'link' }"
      >
        <h4>
          {{$t('table.link')}}
          <span class="arrow" :class="sortOrder"></span>
        </h4>
      </div>
    </div>

    <div v-if="!rows || rows.length === 0" class="pure-g row fix-row">
      <div class="pure-u-1">{{$t('table.noResult')}}</div>
    </div>

    <div v-for="(row, index) in rows" :key="row.name" class="pure-g row fix-row item">
      <div class="pure-u-lg-1-5 pure-u-md-1 pure-u-1">
        <img
          class="pure-img img-cell"
          v-bind:src="row.img || defaultImg"
          v-img-fallback="defaultImg"
          :alt="row.name"
        >
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">{{row.name}}</div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <div
          v-if="row.minPrice !== row.maxPrice"
        >${{row.minPrice.toFixed(2)}} - ${{row.maxPrice.toFixed(2)}}</div>
        <div v-else>${{row.minPrice.toFixed(2)}}</div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <div
          v-if="row.minUnitCost && row.minUnitCost !== row.maxUnitCost"
        >${{ row.minUnitCost.toFixed(2) }} - ${{ row.maxUnitCost.toFixed(2) }}</div>
        <div
          v-else-if=" row.minUnitCost && row.minUnitCost === row.maxUnitCost"
        >${{row.minUnitCost.toFixed(2)}}</div>
        <div v-else if="!row.minUnitCost">N/A</div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <button
          class="pure-button"
          @click="toggleVendors(row)"
        >


        {{showVendors[row.name]? $t('table.hide') : $t('table.show')}} {{$t('table.vendors')}}</button>
      </div>
      <div class="pure-u-1" v-if="showVendors[row.name] === true">
        <div v-for="v in row.vendors" :key="v.link" class="pure-g m-b-1">
          <div class="pure-u-lg-2-5 pure-u-md-1-4 pure-u-2-5">{{v.name}}</div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">${{v.price.toFixed(2)}}</div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <span v-if="v.unitCost">({{(v.unitCost).toFixed(2)}} {{$t('table.perRound')}})</span>
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <a
              @click="itemClicked(v.link)"
              v-bind:href="v.link"
              target="_blank"
              rel="nofollow noopener"
            >{{$t('table.buyFrom')}} {{v.vendor}}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="pure-u-lg-1-2 pure-u-1">
        <div>{{$t('table.page')}}</div>
        <div>
          <button
            @click="updatePage(1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === 1"
          >|<<</button>
          <button
            @click="updatePage(page - 1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === 1"
          ><</button>
          {{page}} {{$t('table.of')}} {{pages}}
          <button
            @click="updatePage(page+1)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === pages"
          >></button>
          <button
            @click="updatePage( pages)"
            class="pure-button button-xsmall"
            v-bind:disabled="page === pages"
          >>>|</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare const BASE_API_URL: string
import { centerFireCalibres } from 'ammobin-classifier/build/centerfire-calibres'
import { rimfireCalibres } from 'ammobin-classifier/build/rimfire-calibres'
import { shotgunGauges } from 'ammobin-classifier/build/shotgun-gauges'

export default {
  data: function() {
    return {
      centerfireCalibres: centerFireCalibres.map(l => l[0].toUpperCase()).sort(),
      rimfireCalibres: rimfireCalibres.map(l => l[0].toUpperCase()).sort(),
      shotgunGauges: shotgunGauges.map(l => l[0].toUpperCase()).sort(),
      provinces: [null, 'AB', 'BC', 'MB', 'NB', 'NS', 'NT', 'NL', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
      defaultImg: require('~/assets/blank.png'),
      showVendors:
        this.rows.map(i => i.name).reduce((sv, k) => {
          sv[k] = this.$store.state.isCrawler // show google all the results...
          return sv
        }, {}) || {},
    }
  },
  props: ['rows', 'pages', 'ammotype', 'vendors'],
  watch: {
    rows() {
      this.showVendors =
        this.rows.map(i => i.name).reduce((sv, k) => {
          sv[k] = this.$store.state.isCrawler // show google all the results...
          return sv
        }, {}) || {}
    },
  },
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
    province() {
      return this.$route.query.province
    },
    vendor() {
      return this.$route.query.vendor
    },
    query() {
      return this.$route.query.query
    },
    sortField() {
      return this.$route.query.sortField || 'minPrice'
    },
    sortOrder() {
      return this.$route.query.sortOrder || 'ASC'
    },
    showCenterfireCalibres() {
      return !this.ammotype || this.ammotype === 'centerfire'
    },
    showRimfireCalibres() {
      return !this.ammotype || this.ammotype === 'rimfire'
    },
    showShotgunGuages() {
      return !this.ammotype || this.ammotype === 'shotgun'
    },
  },
  methods: {
    itemClicked(link) {
      const click = JSON.stringify({ link })
      if (!navigator.sendBeacon) {
        this.$axios.post(BASE_API_URL + 'track-click', click)
      } else {
        navigator.sendBeacon(BASE_API_URL + 'track-click', click)
      }
    },
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
    },
    toggleVendors(row) {
      const { name, brand, calibre } = row
      const open = !!this.showVendors[name]
      this.showVendors[name] = !open

      if (!open) {
        const view = JSON.stringify({
          calibre,
          brand,
        })

        if (!navigator.sendBeacon) {
          this.$axios.post(BASE_API_URL + 'track-view', view)
        } else {
          navigator.sendBeacon(BASE_API_URL + 'track-view', view)
        }
      }
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
    updateProvince(province) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { province }),
      })
    },
    updateVendor(vendor) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { vendor }),
      })
    },
    updateQuery(query) {
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, { query }),
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
  min-height: 171px;
}
</style>
