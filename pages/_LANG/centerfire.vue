<template>
  <div class="container">
    <h1>{{$t('default.centerfire')}}</h1>
    <my-table v-if="!error" v-bind:rows="rows" :pages="pages" :calibres="calibres"></my-table>
    <div v-if="error">{{$t('default.failedToLoad')}}</div>
  </div>
</template>

<script>
import MyTable from "~/components/my-table.vue";
import { getUrl, updateUrl } from "~/helpers";
import { centerFireCalibres } from "ammobin-classifier/build/centerfire-calibres";
export default {
  head() {
    const link = [];
    const url = `https://ammobin.ca/${
      this.$i18n.locale !== "en" ? this.$i18n.locale + "/" : ""
    }centerfire`;
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
      title: (this.calibre || "Centerfire") + " Prices", //TODO: en francais
      meta: [
        {
          hid: "description",
          name: "description",
          content: `The place to view the best ${this.calibre ||
            "Centerfire"} prices across ${this.province || "Canada"}.` //TODO: en francais
        }
      ],
      link
    };
  },
  components: {
    MyTable
  },
  data() {
    return {
      error: null,
      rows: [],
      pages: 1,
      calibres: [
        null,
        ...centerFireCalibres.map(l => l[0].toUpperCase()).sort()
      ]
    };
  },
  computed: {
    page() {
      return Number(this.$route.query.page) || 1;
    },
    calibre() {
      return this.$route.query.calibre;
    },
    pageSize() {
      return Number(this.$route.query.pageSize) || 25;
    }
  },
  watch: {
    page() {
      this.load();
    },
    pageSize() {
      this.load();
    },
    calibre() {
      this.load();
    }
  },
  methods: {
    async load() {
      this.$nuxt.$loading.start();
      try {
        const page = this.page;
        const calibre = this.calibre || "";
        const pageSize = this.pageSize || 25;

        let res = await this.$axios.get(
          BASE_API_URL +
            `centerfire?calibre=${encodeURIComponent(
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
      this.$nuxt.$loading.finish();
    }
  },
  async asyncData({ error, query, app }) {
    try {
      const page = parseInt(query.page || "1");
      const calibre = query.calibre || "";
      let res = await app.$axios.get(
        BASE_API_URL +
          `centerfire?calibre=${encodeURIComponent(calibre)}&page=${page}`
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

