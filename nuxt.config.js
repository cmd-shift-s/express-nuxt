require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
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
