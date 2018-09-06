import { JsonController, Get, Post, Put, Delete, Body, BodyParam, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import debug from 'debug'
import { Todo } from '~/share/models'

@JsonController('/todos')
export class TodoController {
  private logger = debug('server:controllers:todo')

  private todos: Todo[] = []
  private index: number = 1

  @Get()
  public all() {
    return this.todos
  }

  @Post()
  public add(@BodyParam('text') text: string) {
    this.logger(text)

    if (!text || text.trim() === '') {
      throw new BadRequestError()
    }

    const todo: Todo = {
      id: this.index++,
      text, done: false
    }

    this.todos.push(todo)

    return todo
  }

  @Put('/:id')
  public save(@Param('id') id: number, @Body() todoParam: Todo) {
    this.logger(todoParam)
    const index = this.todos.findIndex(v => v.id === id)
    if (!~index) {
      throw new NotFoundError()
    }

    if (!todoParam || !todoParam.text || todoParam.text.trim() === '') {
      throw new BadRequestError()
    }

    const todo = this.todos[index]
    Object.assign(todo, todoParam)

    return todo
  }

  @Delete('/:id')
  public remove(@Param('id') id: number) {
    this.logger(id)
    const index = this.todos.findIndex(v => v.id === id)
    if (!~index) {
      throw new NotFoundError()
    }

    return this.todos.splice(index, 1)
  }
}
