<template lang="html">
  <form @submit.prevent="input($event)">
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
  </form>
</template>

<script>
export default {
  name: 'TodoInput',
  methods: {
    input({target}) {
      this.$emit('input', target[0].value)
      target.reset()
    }
  }
}
</script>
