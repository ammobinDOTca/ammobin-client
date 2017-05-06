<template>
  <div class="">
    <div class="pure-g">
      <div class="pure-u-1-4"></div>
      <div class="pure-u-1-4">name</div>
      <div class="pure-u-1-4">price</div>
      <div class="pure-u-1-4">link</div>
    </div>
  
    <div v-for="row in rows" class="pure-g">
      <div class="img-cell pure-u-1-4"><img class="pure-img fixed-img" v-bind:src="row.img" /></div>
      <div class="pure-u-1-4">{{row.name}}</div>
      <div class="pure-u-1-4">{{row.price | currency}}</div>
      <div class="pure-u-1-4"><a v-bind:href="row.link">buy from {{row.vendor}}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  props: [
    'rows'
  ],

}
</script>

<style>
.fill {
  width: 100%
}

.fixed-img-cell {
  max-width: 165px;
  max-height: 165px;
}

.img-cell {
  height: 165px;
}
</style>