<template lang="html">
  <div>
    <form @submit.prevent="onSubmit($event)">
      <input type="text"><button type="submit">send</button>
    </form>
    echo: {{ msg }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {

  msg: string = ''

  async onSubmit({ target }: {target: HTMLFormElement}) {
    const inputEl = target.firstElementChild as HTMLInputElement
    const msg = inputEl.value
    if (!msg) {
      inputEl.focus()
      return
    }

    const params = { msg }
    const { data } = await this.$axios.get('echo', { params })
    this.msg = data.msg
  }
}
</script>

<style lang="css">
</style>
