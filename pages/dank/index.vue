<template>
  <div class="container">
    <h1>Today's Dankest Ammo Listings</h1>
    <div class="row">
      <div class="pure-u-1-3">
        <img v-bind:src="img1" class="dank-img" />
      </div>
      <h3 class="pure-u-1-3">Everything that failed to be classified</h3>
      <div class="pure-u-1-3">
        <img v-bind:src="img2" class="dank-img" />
      </div>
    </div>
    <div class="">
      <div class="pure-form pure-form-stacked">
        <div id="search" class="pure-u-1 pure-u-md-1-6">
          <label>Search</label>
          <input name="query" v-model="searchQuery" class="pure-input-1" placeholder="ie: Barnaul, surplus, 00 Buck" disabled>
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
        <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('price')" :class="{ active: sortKey == 'price' }">
          <h4>Price
            <span class="arrow" :class="sortOrders['price'] > 0 ? 'asc' : 'dsc'"></span>
          </h4>
        </div>
        <div class="pure-u-lg-1-5 pure-u-1-4 title" @click="sortBy('vendor')" :class="{ active: sortKey == 'vendor' }">
          <h4>Link
            <span class="arrow" :class="sortOrders['vendor'] > 0 ? 'asc' : 'dsc'"></span>
          </h4>
        </div>
      </div>

      <div v-if="filteredRows.length === 0" class="pure-g row fix-row no-res">
        <div class="pure-u-1"> no results found.</div>
      </div>

      <div v-for="(row, index) in filteredRows" class="pure-g row fix-row">
        <div class="pure-u-lg-1-4 pure-u-md-1 pure-u-1">
          <img class="pure-img img-cell" v-bind:src="row.img || defaultImg">
        </div>
        <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1 m-b-1 capitalize">
          {{row.name}}
        </div>
        <div class="pure-u-lg-1-4 pure-u-md-1-4 pure-u-1 m-b-1 ">
          ${{row.price ? row.price.toFixed(2) : '???'}}
        </div>
        <div class="pure-u-lg-1-4 pure-u-md-1-4  pure-u-1 m-b-1">
          <a v-bind:href="row.link" target="_blank" rel="nofollow">Buy From {{row.vendor}}</a>

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
    <div v-if="error">Failed to load the dankest.</div>
    <div class="row">
      <div class="pure-u-1-3">
        <img v-bind:src="img3" class="dank-img" />
      </div>
      <h3 class="pure-u-1-3">Everything that failed to be classified</h3>
      <div class="pure-u-1-3">
        <img v-bind:src="img4" class="dank-img" />
      </div>
    </div>
  </div>
</template>

<style>
.dank-img {
  width: inherit;
  max-width: 100px;
  max-height: 100px;
}

.no-res {
  height: 150px;
}
</style>

<script>
import MyTable from '~/components/my-table.vue'
import { getDank } from '~/api.js';
export default {
  head: {
    title: 'Dankest Ammo Items Found Today',
    meta: [
      { hid: 'description', name: 'description', content: 'The dankest list of ammo items for sale online today in Canada.' }
    ]
  },
  components: {

  },
  data() {
    return {

      // current page index
      page: 1,
      // default page size
      pageSize: 25,
      searchQuery: '',
      sortKey: 'price',
      sortedListLength: 0,
      sortOrders: {
        name: 1,
        vendor: 1,
        price: 1,
      },
      showVendors: {},
      defaultImg: require('~/assets/blank.png'),

      error: null
    }
  },
  computed: {
    filteredRows() {
      let data = this.rows;
      let sortKey = this.sortKey;
      let order = this.order;
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
        })
      }

      this.sortedListLength = data.length; // gross side effect. but lets us know how many pages of data there are
      let start = (this.page - 1) * this.pageSize;
      let end = Math.min(this.page * this.pageSize, data.length);
      return data.slice(start, end);
    },
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
  },
  async asyncData({ error, query }) {
    const imgs = [
      require('~/assets/dank/every-russian.jpg'),
      require('~/assets/dank/k.jpg'),
      require('~/assets/dank/smell.png'),
      require('~/assets/dank/Tacticool.jpg'),
      require('~/assets/dank/canada-ww1-win.jpg'),
      require('~/assets/dank/colonial-wifo.jpg'),
      require('~/assets/dank/dam-business.jpg'),
      require('~/assets/dank/no-sorry.jpg'),
      require('~/assets/dank/rcmp-pepe.jpg'),
      require('~/assets/dank/svt-moose.jpg'),


    ]
    try {
      let rows = await getDank();
      return {
        rows,
        // lazy.....
        img1: imgs[Math.floor(Math.random() * imgs.length)],
        img2: imgs[Math.floor(Math.random() * imgs.length)],
        img3: imgs[Math.floor(Math.random() * imgs.length)],
        img4: imgs[Math.floor(Math.random() * imgs.length)],
      };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load the dankest', error: e };
    }
  },

}
</script>

