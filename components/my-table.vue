<template>
  <div class="">
    <div class="pure-form pure-form-stacked">
      <div id="search" class="pure-u-1 pure-u-md-1-6">
        <label>Search</label>
        <input name="query" v-model="searchQuery" class="pure-input-1" placeholder="ie: .22LR, Barnaul, 500">
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
      <div class="pure-u-lg-1-4 pure-u-1"></div>
      <div class="pure-u-lg-1-4 pure-u-1-3 title" @click="sortBy('name')" :class="{ active: sortKey == 'name' }">
        <h4>Name
          <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-4 pure-u-1-3 title" @click="sortBy('price')" :class="{ active: sortKey == 'price' }">
        <h4>Price
          <span class="arrow" :class="sortOrders['price'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
      <div class="pure-u-lg-1-4 pure-u-1-3 title" @click="sortBy('link')" :class="{ active: sortKey == 'link' }">
        <h4>Link
          <span class="arrow" :class="sortOrders['link'] > 0 ? 'asc' : 'dsc'"></span>
        </h4>
      </div>
    </div>
  
    <div v-for="(row, index) in filteredRows" class="pure-g row">
      <div class="pure-u-lg-1-4 pure-u-1">
        <img class="pure-img img-cell" v-bind:src="row.img" />
      </div>
      <div class="pure-u-lg-1-4 pure-u-1 m-b-1">{{row.name}}</div>
      <div class="pure-u-lg-1-4 pure-u-1 m-b-1 ">${{row.price.toFixed(2)}}</div>
      <div class="pure-u-lg-1-4 pure-u-1 m-b-1">
        <a v-bind:href="row.link" target="_blank">Buy From {{row.vendor}}</a>
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
    sortKey: 'price',
    sortedListLength: 0,
    calibre: null,
    sortOrders: {
      name: 1,
      link: 1,
      price: 1
    }
  }),
  props: [
    'rows'
  ],
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
      let data = this.rows.slice();
      let sortKey = this.sortKey;
      let order = this.sortOrders[sortKey];
      if (this.searchQuery) {
        data = data.filter(r => r.name && r.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
      }
      if (this.calibre) {
        data = data.filter(r => r.calibre === this.calibre);
      }
      if (sortKey) {
        data = data.sort(function (a, b) {
          let aa = a[sortKey];
          let bb = b[sortKey];
          if (aa === bb) {
            return 0;
          } else if (aa > bb) {
            return 1 * order;
          } else {
            return -1 * order;
          }
        });
      }

      this.sortedListLength = data.length; // gross side effect. but lets us know how many pages of data there are
      let start = (this.page - 1) * this.pageSize;
      let end = Math.min(this.page * this.pageSize, data.length)
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
    }
  }

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
</style>