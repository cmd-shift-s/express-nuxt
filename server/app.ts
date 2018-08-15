import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import * as express from 'express'
import * as morgan from 'morgan'

require('dotenv').config()

export const app = express()

app.use(morgan(process.env.LOG_LEVEL))

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [`${__dirname}/controllers/*.{ts,js}`]
})
