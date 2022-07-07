import { Nuxt } from 'nuxt'

// Add Nuxt
import config from './nuxt.config'
// tell it not to build or watch
config.dev = false
const nuxt = new Nuxt(config)

export const nuxt = (event, context, cb) => {
  nuxt.ready().then(n => {
    //once nuxt is ready, render the given route
    return n
      .renderRoute(event.path)
      .then(ass => {
        const { html, error, redirected, ...props } = ass

        if (error) {
          console.error('ERROR', error)
        }

        cb(null, { statusCode: error ? 500 : 200, body: html })
      })
      .catch(e => {
        console.error(e)
        cb(e)
      })
  })
}
