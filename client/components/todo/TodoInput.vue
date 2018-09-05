<template lang="html">
  <form @submit.prevent="input($event)">
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TodoInput extends Vue {
  input({ target }) {
    this.$emit('input', target[0].value)
    target.reset()
  }
}
</script>
