// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'description', name: 'description', content: 'No longer the place to view ammo prices across Canada.' },
        {
          // google webmaster
          name: 'google-site-verification',
          content: 'X3ZsfEygJo1ywKMaf5Q8ltUgkgK7o9buM7yMsI6G7yc',
        },
        {
          // bing webmaster (since helps to feed duckduckgo)
          name: 'msvalidate.01',
          content: '330D6A0BB2221C7F78C038494DE50309',
        },
        {
          // yandex also feeds duckduckgo
          name: 'yandex-verification',
          content: '99071bdc94d7e5ed',
        },
        {
          name: 'theme_color',
          content: '#41b883',
        },
      ]
    }
  }
})
