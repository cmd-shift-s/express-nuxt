import { createRequest, createResponse } from 'node-mocks-http'
import { ErrorHandler } from '~/api/middlewares/ErrorHandler'
import { NotFoundError, HttpError } from 'routing-controllers'

describe('ErrorHandler', () => {

  it('NotFoundError', () => {
    // Given
    const handler = new ErrorHandler()
    const req = createRequest()
    const res = createResponse()

    const error = new NotFoundError()

    // When
    handler.error(error, req, res)

    // Then
    expect(res._getStatusCode()).toBe(404)
    expect(res._getData()).toEqual(JSON.stringify(error))
  })

  it('CustomError', () => {
    // Given
    const handler = new ErrorHandler()
    const req = createRequest()
    const res = createResponse()

    const error = new HttpError(1, 'CustomError')

    // When
    handler.error(error, req, res)

    // Then
    expect(res._getStatusCode()).toBe(error.httpCode)
    expect(res._getData()).toEqual(JSON.stringify(error))
  })
})
