import request from 'supertest'
import { app } from '~/app'
import { Todo } from '@share/models'

describe('TodoController', () => {
  const req = request(app)

  it('all', async () => {
    // When
    const res = await req.get('/api/todos')
      .expect(200)

    // Then
    expect(res.body).toBeInstanceOf(Array)
  })

  it('add', async () => {
    // Given
    const text = 'Todo 1'

    // When
    const res = await req.post('/api/todos')
      .send({ text })
      .expect(200)

    // Then
    const todo: Todo = res.body
    expect(todo).not.toBeNull()
    expect(todo.id).toBeGreaterThan(0)
    expect(todo.text).toBe(text)
    expect(todo.done).toBe(false)
  })

  it('add - bad request', () => {
    return req.post('/api/todos')
      .send({})
      .expect(400)
  })

  it('save', async () => {
    // Given
    const { body: todo } = await req.post('/api/todos')
      .send({ text: 'Todo 2' })
      .expect(200) as { body: Todo }

    // When
    todo.text = 'Updated Text'

    const { body: updatedTodo } = await req.put(`/api/todos/${todo.id}`)
      .send(todo)
      .expect(200) as { body: Todo }

    // Then
    expect(updatedTodo).toEqual(todo)
  })

  it('save - not found', () => {
    return req.put('/api/todos/0')
      .expect(404)
  })

  it('save - bad request', async () => {
    // Given
    const { body: todo } = await req.post('/api/todos')
      .send({ text: 'Bad Request' })
      .expect(200) as { body: Todo }

    return req.put(`/api/todos/${todo.id}`)
      .send({})
      .expect(400)
  })

  it('delete', async () => {
    // Given
    const { body: todo } = await req.post('/api/todos')
      .send({ text: 'Todo 3' })
      .expect(200) as { body: Todo }

    // When
    await req.delete(`/api/todos/${todo.id}`)
      .expect(200)

    // Then
    return req.put(`/api/todos/${todo.id}`)
      .send(todo)
      .expect(404)
  })

  it('delete - not found', () => {
    return req.delete('/api/todos/0')
      .expect(404)
  })
})
