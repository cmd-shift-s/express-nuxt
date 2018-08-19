<template lang="html">
  <div>
    <form @submit.prevent="onSubmit($event)">
      <input type="text"><button type="submit">send</button>
    </form>
    echo: {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    msg: ''
  }),
  methods: {
    async onSubmit({target}) {
      const inputEl = target.firstElementChild
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
}
</script>

<style lang="css">
</style>
