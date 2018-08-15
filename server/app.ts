import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as express from 'express'
import * as morgan from 'morgan'
import { NotFoundHandler } from './middlewares/NotFound'
import { ErrorHandler } from './middlewares/ErrorHandler'

require('dotenv').config()

export const app = express()

app.use(morgan(process.env.LOG_LEVEL))

useExpressServer(app, {
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/*.{ts,js}`],
  middlewares: [NotFoundHandler, ErrorHandler]
})
