<template lang="html">
  <!-- https://github.com/tastejs/todomvc-app-template -->
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li v-for="todo of showTodos" :key="todo.id" :class="itemClassses(todo)">
            <div class="view">
              <input type="checkbox" class="toggle" v-model="todo.done">
              <label @dblclick="toggle($event, todo)">{{todo.text}}</label>
              <button class="destroy"></button>
            </div>
            <input type="text" class="edit" v-model="text" @blur="toggle()" @keyup.esc="toggle()" @keyup.enter="save(todo)">
          </li>
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

<script>
export default {
  name: 'todos-page',
  head: {
    title: 'TodoMVC'
  },
  data: () => ({
    todos: [],
    editTodoId: 0,
    text: '',
  }),
  async asyncData({$axios}) {
    return {
      // todos: await $axios.get('todos').then(res => res.data.data)
      todos: [
        {
          id: 1,
          text: 'Taste JavaScript',
          done: true
        },
        {
          id: 2,
          text: 'Buy a unicorn',
          done: false
        }
      ],
      tab: 'all'
    }
  },
  computed: {
    completedTodos() {
      return this.todos.filter(todo => todo.done)
    },
    activeTodos() {
      return this.todos.filter(todo => !todo.done)
    },
    hasCompleted() {
      return !!this.completedTodos.length
    },
    showAll() { return this.tab === 'all' },
    showActive() { return this.tab === 'active' },
    showCompleted() { return this.tab === 'completed' },
    showTodos() {
      switch(true) {
        case this.showActive: return this.activeTodos
        case this.showCompleted: return this.completedTodos
        default:
          return this.todos
      }
    },
  },
  methods: {
    itemClassses(todo) {
      return {
        completed: todo.done,
        editing: this.editTodoId === todo.id
      }
    },
    clearCompleted() {
      this.todos = this.activeTodos
    },
    toggle($event, todo) {
      if (todo) {
        this.editTodoId = todo.id
        this.text = todo.text
        this.$nextTick(() => {
          $event.target.parentElement.nextSibling.focus()
        })
      } else {
        this.editTodoId = 0
      }
    },
    save(todo) {
      todo.text = this.text
      this.toggle()
    }
  }
}
</script>

<style lang="scss">
@import url("todomvc-app-css");
a {
  cursor: pointer;
}
</style>
