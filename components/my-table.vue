<template>
  <div class="">
    <div class="pure-form pure-form-stacked">
      <div id="search" class="pure-u-1 pure-u-md-1-6">
        <label>Search</label>
        <input name="query" v-model="searchQuery" class="pure-input-1" placeholder="ie: Barnaul, surplus, 00 Buck">
      </div>
  
      <div class="pure-u-1 pure-u-md-1-6">
        <label for="pageSize"> Page Size</label>
        <select id="pageSize" v-model.number="pageSize" class="pure-input-1">
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
      </div>
      <div class="pure-u-1 pure-u-md-1-6">
        <label for="pageSize"> Calibre</label>
        <select id="pageSize" v-model="calibre" class="pure-input-1">
          <option v-for="c in calibres">{{c}}</option>
        </select>
      </div>
  
      <div class="pure-u-1 pure-u-md-1-3">
        <label>
          Page
        </label>
        <div>
          <button @click="goto(1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            First
          </button>
          <button @click="goto(page - 1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            Prev
          </button>
          {{page}} of {{pages}}
          <button @click="goto(page+1)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            Next
          </button>
          <button @click="goto( pages)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            Last
          </button>
        </div>
      </div>
    </div>
    <div class="pure-g row">
      <div class="pure-u-lg-1-5 pure-u-1"></div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('name')" :class="{ active: sortKey == 'name' }">
        <h4>Name
          <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('minPrice')" :class="{ active: sortKey == 'minPrice' }">
        <h4>Price
          <span class="arrow" :class="sortOrders['minPrice'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('minUnitCost')" :class="{ active: sortKey == 'minUnitCost' }">
        <h4>Unit Cost
          <span class="arrow" :class="sortOrders['minUnitCost'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('link')" :class="{ active: sortKey == 'link' }">
        <h4>Link
          <span class="arrow" :class="sortOrders['link'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
    </div>
  
    <div v-if="filteredRows.length === 0" class="pure-g row fix-row">
      <div class="pure-u-1"> no results found.</div>
    </div>
  
    <div v-for="(row, index) in filteredRows" class="pure-g row fix-row">
      <div class="pure-u-lg-1-5 pure-u-md-1 pure-u-1">
        <img class="pure-img img-cell" v-bind:src="row.img || defaultImg" />
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">
        {{row.name}}
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1 ">
        <div v-if="row.minPrice !== row.maxPrice">
          ${{row.minPrice.toFixed(2)}} - ${{row.maxPrice.toFixed(2)}}
        </div>
        <div v-else>
          ${{row.minPrice.toFixed(2)}}
        </div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1 m-b-1">
        <div v-if="row.minUnitCost && row.minUnitCost !== row.maxUnitCost">
          ${{ row.minUnitCost.toFixed(2) }} - ${{ row.maxUnitCost.toFixed(2) }}
        </div>
        <div v-else-if=" row.minUnitCost && row.minUnitCost === row.maxUnitCost">
          ${{row.minUnitCost.toFixed(2)}}
        </div>
        <div v-else if="!row.minUnitCost">
          N/A
        </div>
      </div>
      <div class="pure-u-lg-1-5 pure-u-md-1-4  pure-u-1 m-b-1">
        <button class="pure-button" @click="toggleVendors(row.name)">
          {{showVendors[row.name]? 'hide':'show'}} vendors
        </button>
      </div>
      <div class="pure-u-1" v-if="showVendors[row.name] === true">
        <div v-for="v in row.vendors" class="pure-g m-b-1">
          <div class="pure-u-lg-2-5 pure-u-md-1-4 pure-u-2-5 ">
            {{v.name}}
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            ${{v.price.toFixed(2)}}
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <span v-if="v.unitCost">({{(v.unitCost).toFixed(2)}} per round)</span>
          </div>
          <div class="pure-u-lg-1-5 pure-u-md-1-4 pure-u-1-5">
            <a v-bind:href="v.link" target="_blank" rel="nofollow noopener">Buy From {{v.vendor}}</a>
          </div>
        </div>
  
      </div>
    </div>
    <div>
      <div class="pure-u-lg-1-2 pure-u-1">
        <div>
          Page
        </div>
        <div>
          <button @click="goto(1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            First
          </button>
          <button @click="goto(page - 1)" class="pure-button button-xsmall" v-bind:disabled="page === 1">
            Prev
          </button>
          {{page}} of {{pages}}
          <button @click="goto(page+1)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            Next
          </button>
          <button @click="goto( pages)" class="pure-button button-xsmall" v-bind:disabled="page === pages">
            Last
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    // current page index
    page: 1,
    // default page size
    pageSize: 25,
    searchQuery: '',
    sortKey: 'minUnitCost',
    sortedListLength: 0,
    sortOrders: {
      name: 1,
      link: 1,
      minPrice: 1,
      minUnitCost: 1
    },
    showVendors: {},
    defaultImg: require('~/assets/blank.png')
  }),
  props: [
    'rows',
    'calibre'
  ],
  watch: {
    calibre: function () {
      // update url with the calibre everytime it changes
      // should happen in page component
      history.pushState({}, 'generate-routes', window.location.pathname + `?cailbre=${encodeURIComponent(this.calibre)}`);
    }
  },
  computed: {
    // list of calibres from ALL results
    calibres() {
      if (!this.rows) {
        return [];
      }
      return Object.keys(this.rows.reduce((list, row) => {
        if (!list[row.calibre]) {
          list[row.calibre] = true;
        }
        return list;
      }, { '': true })).sort();
    },
    // apply filters + sorting + pagination to results
    filteredRows() {
      let data = JSON.parse(JSON.stringify(this.rows)); // super fancy deep list of objects
      let sortKey = this.sortKey;
      let order = this.sortOrders[sortKey];
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        // data = data.filter(r => (r.name &&
        //   r.name.toLowerCase().indexOf(q) >= 0));
        data = data.map(d => {
          d.vendors = d.vendors.filter(r => (r.name &&
            r.name.toLowerCase().indexOf(q) >= 0));
          return d;
        })
          .filter(f => f.vendors && f.vendors.length);

      }
      if (this.calibre) {
        data = data.filter(r => r.calibre === this.calibre);
      }
      if (sortKey) {
        data = data.sort(function (a, b) {
          let aa = a[sortKey];
          let bb = b[sortKey];
          // put unknown unit costs at the bottom of the sort order
          if (sortKey === 'minUnitCost') {
            if (aa <= 0) {
              aa = Number.MAX_SAFE_INTEGER;
            }
            if (bb <= 0) {
              bb = Number.MAX_SAFE_INTEGER;
            }
          }

          if (aa === bb) {
            return 0;
          } else if (aa > bb) {
            return 1 * order;
          } else {
            return -1 * order;
          }
        })
        data = data.map(row => {
          row.vendors = row.vendors.sort(function (a, b) {
            let groupedKey;
            switch (sortKey) {
              case 'minUnitCost':
                groupedKey = 'unitCost';
                break;
              case 'name':
                groupedKey = 'name';
                break;
              case 'minPrice':
                groupedKey = 'price';
                break;
              case 'link':
                groupedKey = 'vendor';
                break;
              default:
                console.error('unhandled sort key', sortKey)
            }

            let aa = a[groupedKey];
            let bb = b[groupedKey];
            // put unknown unit costs at the bottom of the sort order
            if (groupedKey === 'unitCost') {
              if (aa <= 0) {
                aa = Number.MAX_SAFE_INTEGER;
              }
              if (bb <= 0) {
                bb = Number.MAX_SAFE_INTEGER;
              }
            }

            if (aa === bb) {
              return 0;
            } else if (aa > bb) {
              return 1 * order;
            } else {
              return -1 * order;
            }
          });
          return row
        })
      }

      this.sortedListLength = data.length; // gross side effect. but lets us know how many pages of data there are
      let start = (this.page - 1) * this.pageSize;
      let end = Math.min(this.page * this.pageSize, data.length)
      this.showVendors = data.map(i => i.name).reduce((sv, k) => {
        sv[k] = false;
        return sv;
      }, {})
      return data.slice(start, end);

    },
    // get number of filter pages
    pages() {
      const pages = Math.max(Math.ceil(this.sortedListLength / this.pageSize), 1);

      // if filter + old page num are out side of results, bring us to the end
      if (this.page > pages) {
        this.page = pages;
      }

      return pages;
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    goto(page) {
      if (page > this.pages) {
        this.page = this.pages;
      } else {
        this.page = page;
      }
      window.scroll(0, 0); //scroll to top of page
    },
    toggleVendors(name) {
      this.showVendors[name] = !this.showVendors[name];
    }
  },


}
</script>

<style>
.title {
  color: darkgray;
}

.fill {
  width: 100%
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
</style>
