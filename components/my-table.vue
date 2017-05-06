<template>
  <div class="">
    <form id="search">
      Search
      <input name="query" v-model="searchQuery">
    </form>
    <div class="pure-g row">
      <div class="pure-u-1-4"></div>
      <div class="pure-u-1-4">
        <h4>Name</h4></div>
      <div class="pure-u-1-4">
        <h4>Price</h4></div>
      <div class="pure-u-1-4">
        <h4>Link</h4></div>
    </div>
  
    <div v-for="(row, index) in filteredRows" class="pure-g row">
      <div class="pure-u-1-4"><img class="pure-img img-cell" v-bind:src="row.img" /></div>
      <div class="pure-u-1-4">{{row.name}}</div>
      <div class="pure-u-1-4">${{row.price}}</div>
      <div class="pure-u-1-4"><a v-bind:href="row.link">buy from {{row.vendor}}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchQuery: ''
  }),
  props: [
    'rows'
  ],
  computed: {
    filteredRows() {
      let data = this.rows;
      if (this.searchQuery) {
        data = data.filter(r => r.name && r.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
      }

      return data;

    }
  }

}
</script>

<style>
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
</style>