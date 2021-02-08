<template>
  <div class="main">
    <a class="fork-me-hard-dady" href="https://github.com/ammobindotca" target="_blank" rel="noopener">
      <img
        style="position: absolute; top: 0; right: 0; border: 0"
        src="~/assets/fork.png"
        alt="Fork me on GitHub"
        title="Fork me on GitHub"
      />
    </a>
    <div class="pure-menu pure-menu-horizontal pure-menu-scrollable light-grey">
      <ul class="pure-menu-list">
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': currentPage === '/' }">
          <nuxt-link class="pure-menu-link" :to="path('/')">
            {{ DOMAIN }}
          </nuxt-link>
        </li>
        <li :class="{ 'pure-menu-selected': currentPage === '/centerfire' }" class="pure-menu-item">
          <nuxt-link class="pure-menu-link" :to="path('/centerfire')">{{ $t('default.centerfire') }}</nuxt-link>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': currentPage === '/shotgun' }">
          <nuxt-link class="pure-menu-link" :to="path('/shotgun')">{{ $t('default.shotgun') }}</nuxt-link>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': currentPage === '/rimfire' }">
          <nuxt-link class="pure-menu-link" :to="path('/rimfire')">{{ $t('default.rimfire') }}</nuxt-link>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': currentPage === '/reloading' }">
          <nuxt-link class="pure-menu-link" :to="path('/reloading')">{{ $t('default.reloading') }} (BETA)</nuxt-link>
        </li>
        <li class="pure-menu-item" :class="{ 'pure-menu-selected': currentPage === '/about' }">
          <nuxt-link class="pure-menu-link" :to="path('/about')">{{ $t('default.about') }}</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link
            v-if="$i18n.locale === 'en'"
            class="pure-menu-link"
            :to="$route.fullPath === '/' ? '/fr' : $route.fullPath.replace('/en', '/fr')"
            active-class="none"
            exact
            >{{ $t('links.french') }}</nuxt-link
          >
          <nuxt-link
            v-else
            class="pure-menu-link"
            :to="$route.fullPath.replace('/fr', '/en')"
            active-class="none"
            exact
            >{{ $t('links.english') }}</nuxt-link
          >
        </li>
      </ul>
    </div>
    <nuxt />
    <footer class="footer">
      {{ DOMAIN }} {{ new Date().getFullYear() }}
      <a :href="mail">Contact</a>
      <div>
        <a href="https://github.com/ammobindotca" target="_blank" rel="noopener">github</a>
        |
        <a href="https://www.instagram.com/ammobin.ca" target="_blank" rel="noopener">instagram</a>
        |
        <a href="https://status.ammobin.ca" target="_blank" rel="noopener">status</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import '@nuxtjs/axios'

import { Component, Vue } from 'vue-property-decorator'
declare const BASE_URL: string
declare const DOMAIN: string

@Component({
  head() {
    return {
      title: DOMAIN,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.tagline'),
        },
      ],
      htmlAttrs: {
        lang: this.$i18n.locale || 'en',
      },
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Person',
            name: DOMAIN,
            url: BASE_URL,
            sameAs: ['https://github.com/ammobindotca', 'https://www.instagram.com/ammobin.ca'],
          }),
          type: 'application/ld+json',
        },
      ],
    } as any
  },
})
export default class Layout extends Vue {
  // todo: attach correct types
  DOMAIN = DOMAIN
  get currentPage() {
    return this.$route.path
  }

  mail = 'mailto:' + 'contact' + '@' + 'ammobin.ca' // this probably will do nothing to stop bots...

  path(url) {
    return '/' + this.$i18n.locale + url
  }
}
</script>

<style>
.footer {
  text-align: center;
  margin-top: 100px;
}

.pure-menu-link {
  color: #4f4f4f;
}

.light-grey {
  background-color: #f1f1f1;
}
/* hide fork me link on mobile*/

@media screen and (max-width: 35.5em) {
  .fork-me-hard-dady {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: hsl(0, 0%, 14%);
    color: #e7f6e8;
  }
}
</style>
