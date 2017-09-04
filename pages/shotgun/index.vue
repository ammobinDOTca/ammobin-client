<template>
  <div class="container">
    <h1>Shotgun</h1>
    <my-table v-if="!error" v-bind:rows="rows" :calibre.sync="calibre" :page.sync="page" @pages="pages=$event"></my-table>
    <div v-if="error">failed to load ammo list</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'
import { getUrl, updateUrl } from '~/helpers'

export default {
  head() {
    const link = [];
    if (this.page > 1) {
      link.push({ rel: 'prev', href: getUrl('https://ammobin.ca/shotgun', this.page - 1, this.calibre) })
    }

    if (this.pages > this.page) {
      link.push({ rel: 'next', href: getUrl('https://ammobin.ca/shotgun', this.page + 1, this.calibre) });
    }

    return {
      title: this.calibre + ' Shotgun Prices',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `The place to view the best ${this.calibre} shotgun shell prices across Canada.`
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
      updateUrl('shotgun', this.page, this.calibre)
    },
    calibre: function() {
      updateUrl('shotgun', this.page, this.calibre)
    }
  },
  data() {
    return {
      error: null,
      rows: [],
      calibre: '',
      page: 1,
      pages: 1
    }
  },
  async asyncData({ error, query, app }) {
    try {
      const page = parseInt(query.page || '1');
      const calibre = query.calibre || '';
      let res = await app.$axios.get(BASE_API_URL + `shotgun?calibre=${encodeURIComponent(calibre)}&page=${page}`);
      const rows = res.data;
      return { rows, calibre, page };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load prices', error: true };
    }
  },
}
</script>
