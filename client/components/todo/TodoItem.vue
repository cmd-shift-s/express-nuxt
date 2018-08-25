<template lang="html">
  <li :class="cx">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="todo.done" @change="save()">
      <label @dblclick="toggle(true)">{{item.text}}</label>
      <button class="destroy" @click="$emit('remove', item.id)"></button>
    </div>
    <input ref="edit" type="text" class="edit" v-model="todo.text" @blur="toggle(false)" @keyup.esc="toggle(false)" @keyup.enter="save()">
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    todo: {
      done: false,
      text: ''
    },
    edit: false,
  }),
  beforeMount() {
    Object.assign(this.todo, this.item)
  },
  computed: {
    cx() {
      return {
        completed: this.item.done,
        editing: this.edit
      }
    }
  },
  methods: {
    toggle(edit) {
      this.edit = edit
      this.todo.text = this.item.text

      if (edit) {
        this.$nextTick(() => {
          this.$refs.edit.focus()
        })
      }
    },
    save() {
      const todo = Object.assign({}, this.item, this.todo)
      this.$emit('save', todo)
      this.toggle()
    },
  }
}
</script>

<style lang="css">
</style>
