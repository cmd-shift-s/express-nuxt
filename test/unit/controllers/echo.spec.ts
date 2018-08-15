import * as request from 'supertest'
import { app } from '~/app'

describe('api - controller - echo', () => {
  const req = request(app)

  it('should return msg', () => {
    const echo = {
      msg: 'Hello'
    }

    return req.get('/api/echo')
      .query(echo)
      .expect(200, echo)
  })
})
