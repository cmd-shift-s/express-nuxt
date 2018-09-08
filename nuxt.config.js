const path = require('path')

require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  srcDir: 'app/',
  build: {
    extend(config) {
      config.resolve.alias['~'] = __dirname
    },
    watch: [
      '.env'
    ]
  },
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
    '@nuxtjs/axios',
    'nuxt-typescript'
  ],
  axios: {
    proxy: !isProd
  },
  proxy: {
    [process.env.API_PREFIX]: { target: process.env.API_URL, pathRewrite: {'^/api/': ''} }
  },
  typescript: {
    tsconfig: 'tsconfig.app.json'
  }
}
