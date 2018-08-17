import request from 'supertest'
import { app } from '~/app'

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
})
