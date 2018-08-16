import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as express from 'express'
import * as morgan from 'morgan'
import { NuxtMiddleware } from './middlewares/Nuxt'
import { NotFoundHandler } from './middlewares/NotFound'
import { ErrorHandler } from './middlewares/ErrorHandler'

require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

export const app = express()

app.use(morgan(process.env.LOG_LEVEL))

const middlewares = [
  NotFoundHandler, ErrorHandler
]

if (isProd) {
  middlewares.unshift(NuxtMiddleware)
}

useExpressServer(app, {
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/*.{ts,js}`],
  middlewares
})
