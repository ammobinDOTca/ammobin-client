<template>
  <div class="container">
    <h1>{{$t('default.rimfire')}}</h1>
    <my-table v-if="!error" v-bind:rows="rows" :pages="pages"></my-table>
    <div v-if="error">{{$t('default.failedToLoad')}}</div>
  </div>
</template>

<script>
import MyTable from "~/components/my-table.vue";
import { getUrl, updateUrl } from "~/helpers";

export default {
  data() {
    return {
      error: null,
      rows: [],
      calibre: "",
      page: 1,
      pages: 1
    };
  },

  head() {
    const link = [];
    const url = `https://ammobin.ca/${
      this.$i18n.locale !== "en" ? this.$i18n.locale + "/" : ""
    }rimfire`;

    if (this.page > 1) {
      link.push({
        rel: "prev",
        href: getUrl(url, this.page - 1, this.calibre)
      });
    }

    if (this.pages > this.page) {
      link.push({
        rel: "next",
        href: getUrl(url, this.page + 1, this.calibre)
      });
    }

    return {
      title: this.calibre + " Rimfire Prices", //TODO: en francais
      meta: [
        {
          hid: "description",
          name: "description",
          content: `The place to view the best ${this.calibre ||
            "rimfire"} prices across ${this.province || "Canada"}.` //TODO: en francais
        }
      ],
      link
    };
  },
  components: {
    MyTable
  },
  watch: {
    page: function() {
      updateUrl("rimfire", this.page, this.calibre);
    },
    calibre() {
      this.load();
    },
    pageSize() {
      this.load();
    }
  },
  methods: {
    async load() {
      try {
        const page = this.page;
        const calibre = this.calibre || "";
        const pageSize = this.pageSize || 25;

        let res = await this.$axios.get(
          BASE_API_URL +
            `rimfire?calibre=${encodeURIComponent(
              calibre
            )}&page=${page}&pageSize=${pageSize}`
        );
        this.rows = res.data.items;
        this.pages = res.data.pages;
      } catch (e) {
        this.statusCode = 500;
        this.message = "Failed to load prices";
        this.error = true;
      }
    }
  },
  async asyncData({ error, query, app }) {
    try {
      const page = parseInt(query.page || "1");
      const calibre = query.calibre || "";
      let res = await app.$axios.get(
        BASE_API_URL +
          `rimfire?calibre=${encodeURIComponent(calibre)}&page=${page}`
      );

      const rows = res.data.items;
      const pages = res.data.pages;
      return { rows, pages };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: "Failed to load prices", error: true };
    }
  }
};
</script>
>
