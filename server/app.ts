import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import express from 'express'
import morgan from 'morgan'
import { RendererMiddleware } from './middlewares/Renderer'
import { NotFoundHandler } from './middlewares/NotFound'
import { ErrorHandler } from './middlewares/ErrorHandler'

require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

export const app = express()

app.use(morgan(process.env.LOG_LEVEL))

const middlewares = [
  NotFoundHandler, ErrorHandler
]

/* istanbul ignore if */
if (isProd) {
  middlewares.unshift(RendererMiddleware)
}

useExpressServer(app, {
  routePrefix: '/api',
  cors: !isProd,
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/*.{ts,js}`],
  middlewares
})
