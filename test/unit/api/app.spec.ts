import request from 'supertest'
import { NotFoundError } from 'routing-controllers'
import { app } from '~/api/app'

describe('app', () => {
  const req = request(app)

  it('not found exception', () => {
    return req.get('/api/not_found')
      .expect(404, JSON.stringify(new NotFoundError()))
  })
})
