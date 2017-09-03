<template>
  <div class="container">
    <h1>Rimfire</h1>
    <my-table v-if="!error" v-bind:rows="rows" :calibre.sync="calibre" :page.sync="page" @pages="pages=$event"></my-table>
    <div v-if="error">failed to load ammo list</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'
import { getUrl, updateUrl } from '~/helpers'


export default {
  data() {
    return {
      error: null,
      rows: [],
      calibre: '',
      page: 1,
      pages: 1
    }
  },

  head() {
    const link = [];

    if (this.page > 1) {
      link.push({ rel: 'prev', href: getUrl('https://ammobin.ca/rimfire', this.page - 1, this.calibre) })
    }

    if (this.pages > this.page) {
      link.push({ rel: 'next', href: getUrl('https://ammobin.ca/rimfire', this.page + 1, this.calibre) });
    }

    return {
      title: this.calibre + ' Rimfire Prices',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The place to view the best ${this.calibre} rimfire prices across Canada.`
        }
      ],
      link
    }
  },
  components: {
    MyTable
  },
  watch: {
    page: function() {
      updateUrl('rimfire', this.page, this.calibre)
    },
    calibre: function() {
      updateUrl('rimfire', this.page, this.calibre)
    }
  },
  async asyncData({ error, query, app }) {
    try {
      let res = await app.$axios.get(BASE_API_URL + 'rimfire');
      const rows = res.data;
      const page = parseInt(query.page || '1');
      return { rows, calibre: query.calibre || '', page };
    } catch (e) {
      console.error(e)
      return { statusCode: 500, message: 'Failed to load prices', error: true };
    }
  },

}
</script>
>
