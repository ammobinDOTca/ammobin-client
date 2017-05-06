<template>
  <div class="">
    <form id="search">
      Search
      <input name="query" v-mode.lazl="searchQuery">
    </form>
    <div class="pure-g row">
      <div class="pure-u-1-4"></div>
      <div class="pure-u-1-4 title" @click="sortBy('name')" :class="{ active: sortKey == 'name' }">
        <h4>Name<span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span></h4>
      </div>
      <div class="pure-u-1-4 title" @click="sortBy('price')" :class="{ active: sortKey == 'price' }">
        <h4>Price<span class="arrow" :class="sortOrders['price'] > 0 ? 'asc' : 'dsc'"></span></h4>
      </div>
      <div class="pure-u-1-4 title" @click="sortBy('link')" :class="{ active: sortKey == 'link' }">
        <h4>Link<span class="arrow" :class="sortOrders['link'] > 0 ? 'asc' : 'dsc'"></span></h4>
      </div>
    </div>
  
    <div v-for="(row, index) in filteredRows" class="pure-g row">
      <div class="pure-u-1-4"><img class="pure-img img-cell" v-bind:src="row.img" /></div>
      <div class="pure-u-1-4">{{row.name}}</div>
      <div class="pure-u-1-4">${{Math.round(row.price)}}</div>
      <div class="pure-u-1-4"><a v-bind:href="row.link">buy from {{row.vendor}}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchQuery: '',
    sortKey: 'price',
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
    filteredRows() {
      let data = this.rows;
      let sortKey = this.sortKey;
      let order = this.sortOrders[sortKey];
      if (this.searchQuery) {
        data = data.filter(r => r.name && r.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
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
      return data;

    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
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
}

.row {
  align-items: center;
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey
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
</style>