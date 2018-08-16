import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'
import { Nuxt } from 'nuxt'

const nuxt = new Nuxt()

@Middleware({ type: 'before' })
export class NuxtMiddleware implements ExpressMiddlewareInterface {

  use(req: Request, res: Response, next: NextFunction): void {
    if (!/^\/api/.test(req.path)) {
      nuxt.render(req, res)
    } else {
      next()
    }
  }

}
