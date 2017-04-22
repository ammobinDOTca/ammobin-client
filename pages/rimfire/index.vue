<template>
  <div class="container">
    <h1>rimfire</h1>
    <my-table v-bind:rows="rows"></my-table>
  </div>
</template>

<script>
import MyTable from '~components/my-table.vue'

export default {
  head: {
    title: 'Rimfire',
    meta: [
      { hid: 'description', name: 'description', content: 'rimfire ammo list' }
    ]
  },
  components: {
    MyTable
  },
  data: function () {
    return {
      rows: [{
        name: 'name 1',
        price: 'CA $123',
        img: 'https://i.ytimg.com/vi/NNvZu09N5TY/hqdefault.jpg?custom=true&w=168&h=94&stc=true&jpg444=true&jpgq=90&sp=68&sigh=gU2xFBXpYereG_XMr8qf4Km2XgE',
        link: 'https://ramsay.xyz',
        vendor: 'test',
        province: 'on',
        type: 'rimfire'
      }, {
        name: 'name 11',
        price: 'CA $1123',
        img: 'http://wpmedia.news.nationalpost.com/2017/04/justin-trudeau-12.png?w=300',
        link: 'https://ramsay.xyz',
        vendor: 'test',
        province: 'on',
        type: 'rimfire'
      }]
    }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
</style>