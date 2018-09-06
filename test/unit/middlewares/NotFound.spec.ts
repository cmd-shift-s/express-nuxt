import { createRequest, createResponse } from 'node-mocks-http'
import { NotFoundHandler } from '~/server/middlewares/NotFound'
import { HttpError } from 'routing-controllers'

describe('NotFoundHandler', () => {

  it('should throw error', () => {
    // Given
    const handler = new NotFoundHandler()
    const req = createRequest()
    const res = createResponse()

    res.headersSent = false

    let error: HttpError

    // When
    try {
      handler.use(req, res)
    } catch (e) {
      error = e
    }

    // Then
    expect(error).not.toBeUndefined()
    expect(error.httpCode).toBe(404)
    expect(error.name).toBe('NotFoundError')
  })

  it('should not throw error', () => {
    // Given
    const handler = new NotFoundHandler()
    const req = createRequest()
    const res = createResponse()

    res.headersSent = true

    let error: HttpError

    // When
    try {
      handler.use(req, res)
    } catch (e) {
      error = e
    }

    // Then
    expect(error).toBeUndefined()
  })
})
