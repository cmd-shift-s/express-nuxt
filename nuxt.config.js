require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  head: {
    title: 'Express & Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Express & Nuxt' }
    ]
  },
  router: {
    base: process.env.ROUTER_BASE
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: !isProd
  },
  proxy: {
    [process.env.API_PREFIX]: process.env.API_URL
  }
}
