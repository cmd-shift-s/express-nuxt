import { JsonController, Get, QueryParam } from 'routing-controllers'
import debug from 'debug'

@JsonController('/echo')
export class EchoController {
  private logger = debug('server:EchoController')

  @Get()
  public echo(@QueryParam('msg') msg: string) {
    this.logger(`GET / msg: ${msg}`)
    return { msg }
  }
}
