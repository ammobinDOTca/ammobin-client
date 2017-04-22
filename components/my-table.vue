<template>
  <table class="pure-table pure-table-horizontal fill">
    <thead>
      <tr>
        <th></th>
        <th>name</th>
        <th>price</th>
        <th>province</th>
        <th>link</th>
      </tr>
    </thead>
  
    <tbody>
      <tr v-for="row in rows">
        <td class="img-cell"><img class="pure-img fixed-img" v-bind:src="row.img" /></td>
        <td>{{row.name}}</td>
        <td>{{row.price}}</td>
        <td>{{row.province}}</td>
        <td><a v-bind:href="row.link">buy from {{row.vendor}}</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => ({
    href: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('https://head-elements.now.sh/about')
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