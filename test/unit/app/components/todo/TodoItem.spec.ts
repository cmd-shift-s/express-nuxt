import { shallowMount } from '@vue/test-utils'
import TodoItem from '~/app/components/todo/TodoItem.vue'
import { Todo } from '~/share/models'

describe('components/todo/TodoItem.vue', () => {
  it('render todo.text', () => {
    const todo: Todo = {
      text: 'Hello',
      done: false
    }
    const wrap = shallowMount(TodoItem, {
      propsData: {
        item: todo
      }
    })

    expect(wrap.text()).toMatch(todo.text)
    expect(wrap.element).toMatchSnapshot()
  })

  it('render edit mode', () => {
    const todo: Todo = {
      text: 'Hello',
      done: false
    }
    const wrap = shallowMount(TodoItem, {
      propsData: {
        item: todo
      }
    })

    wrap.find('label').trigger('dblclick')

    expect(wrap.classes()).toContain('editing')
    expect(wrap.vm.$data.edit).toBe(true)
    expect(wrap.element).toMatchSnapshot()
  })

  it('should call save', () => {
    const todo: Todo = {
      text: 'Hello',
      done: false
    }
    const wrap = shallowMount(TodoItem, {
      propsData: {
        item: todo
      }
    })

    // enable edit mode
    wrap.find('label').trigger('dblclick')

    const input = wrap.find('input.edit')
    todo.text = 'World'

    input.setValue('World')
    expect(wrap.vm.$data.todo.text).toBe(todo.text)

    input.trigger('keyup.enter')

    const emitted = wrap.emitted('save')
    expect(emitted).toHaveLength(1)
    expect(emitted[0][0]).toEqual(todo)

    // disabled edit mode
    expect(wrap.classes()).not.toContain('editing')
    expect(wrap.vm.$data.edit).toBe(false)
    expect(wrap.element).toMatchSnapshot()
  })

  it('should contain "completed" class', () => {
    const todo: Todo = {
      text: 'Hello',
      done: true
    }
    const wrap = shallowMount(TodoItem, {
      propsData: {
        item: todo
      }
    })

    expect(wrap.classes()).toContain('completed')
    expect(wrap.element).toMatchSnapshot()
  })
})
