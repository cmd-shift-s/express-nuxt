require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

const axios = {
  prefix: '/api'
}

if (!isProd) {
  axios.port = process.env.PORT || 3001
}

module.exports = {
  router: {
    base: process.env.ROUTER_BASE
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios
}
