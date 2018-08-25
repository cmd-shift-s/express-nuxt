import { JsonController, Get, QueryParam } from 'routing-controllers'
import debug from 'debug'

@JsonController('/echo')
export class EchoController {
  private logger = debug('server:controllers:echo')

  @Get()
  public echo(@QueryParam('msg', { required: true }) msg: string) {
    this.logger(`GET / msg: ${msg}`)
    return { msg }
  }
}
