import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'
import { Nuxt } from 'nuxt'

export interface IRenderer {
  render(req: Request, res: Response, next?: NextFunction): void
}

@Middleware({ type: 'before' })
export class RendererMiddleware implements ExpressMiddlewareInterface {

  constructor(private readonly renderer?: IRenderer) {
    /* istanbul ignore if */
    if (!this.renderer) {
      this.renderer = new Nuxt()
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    if (!/^\/api/.test(req.path)) {
      this.renderer.render(req, res, next)
    } else {
      next()
    }
  }

}
