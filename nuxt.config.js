require('dotenv').config()

module.exports = {
  router: {
    base: process.env.ROUTER_BASE
  },
  modules: [
    '@nuxtjs/axios'
  ]
}
