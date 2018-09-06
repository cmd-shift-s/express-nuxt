import request from 'supertest'
import { app } from '~/server/app'

describe('EchoController', () => {
  const req = request(app)

  it('should return msg', () => {
    // Given
    const echo = {
      msg: 'Hello'
    }

    // Then
    return req.get('/api/echo')
      .query(echo)
      .expect(200, echo)
  })

  it('should return 400', () => {
    return req.get('/api/echo')
      .expect(400)
  })
})
