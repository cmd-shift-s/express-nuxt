import { createRequest, createResponse } from 'node-mocks-http'
import { RendererMiddleware } from '~/api/middlewares/Renderer'

describe('RendererMiddleware', () => {

  it('should call next', () => {
    // Given
    const render = jest.fn()
    const handler = new RendererMiddleware({ render })
    const req = createRequest({
      path: process.env.API_PREFIX
    })
    const res = createResponse()
    const next = jest.fn()

    // When
    handler.use(req, res, next)

    // Then
    expect(next).toBeCalled()
    expect(render).not.toBeCalled()
  })

  it('should call render', () => {
    // Given
    const render = jest.fn()
    const handler = new RendererMiddleware({ render })

    const req = createRequest()
    const res = createResponse()
    const next = jest.fn()

    // When
    handler.use(req, res, next)

    // Then
    expect(render).toBeCalled()
    expect(next).not.toBeCalled()
  })
})
