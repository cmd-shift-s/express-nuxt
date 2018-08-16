import { Middleware, ExpressMiddlewareInterface, NotFoundError } from 'routing-controllers'
import { Request, Response, NextFunction } from 'express'

@Middleware({ type: 'after' })
export class NotFoundHandler implements ExpressMiddlewareInterface {

  use(req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      throw new NotFoundError()
    }
  }

}
