<template lang="html">
  <!-- https://github.com/tastejs/todomvc-app-template -->
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <todo-input @input="add"></todo-input>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <todo-item
            v-for="todo of showTodos"
            :key="todo.id"
            :item="todo"
            @save="save($event)"
            @remove="remove($event)"
          ></todo-item>
        </ul>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{activeTodos.length}}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a :class="{selected: showAll}" @click="tab = 'all'">All</a>
          </li>
          <li>
            <a :class="{selected: showActive}" @click="tab = 'active'">Active</a>
          </li>
          <li>
            <a :class="{selected: showCompleted}" @click="tab = 'completed'">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" v-show="hasCompleted" @click="clearCompleted">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="https://github.com/gongzza">gongzza</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TodoInput from '~/components/todo/TodoInput.vue'
import TodoItem from '~/components/todo/TodoItem.vue'
import { Todo } from '@share/models'

@Component({
  components: {
    TodoInput, TodoItem
  }
})
export default class TodoPage extends Vue {

  todos: Todo[] = []
  tab: string = 'all'

  get head() {
    return {
      title: 'TodoMVC'
    }
  }

  async asyncData({ $axios }) {
    const { data: todos }: {data: Todo[]} = await $axios.get('todos')
    return {
      todos
    }
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.done)
  }
  get activeTodos() {
    return this.todos.filter(todo => !todo.done)
  }
  get hasCompleted() {
    return !!this.completedTodos.length
  }
  get showAll() { return this.tab === 'all' }
  get showActive() { return this.tab === 'active' }
  get showCompleted() { return this.tab === 'completed' }
  get showTodos() {
    switch (true) {
      case this.showActive: return this.activeTodos
      case this.showCompleted: return this.completedTodos
      default:
        return this.todos
    }
  }

  clearCompleted() {
    this.todos = this.activeTodos
  }
  async save(todo) {
    const { data: updatedTodo }: {data: Todo} = await this.$axios.put(`todos/${todo.id}`, todo)

    const index = this.todos.findIndex(v => v.id === todo.id)
    if (!~index) return

    this.$set(this.todos, index, updatedTodo)
  }
  async add(text) {
    if (!text) return

    const { data: todo }: {data: Todo} = await this.$axios.post('todos', { text })
    this.todos.push(todo)
  }
  async remove(id) {
    await this.$axios.delete(`todos/${id}`)

    const index = this.todos.findIndex(v => v.id === id)
    if (!~index) return

    this.todos.splice(index, 1)
  }
}
</script>

<style lang="scss">
@import url("todomvc-app-css");

a {
  cursor: pointer;
}
</style>
