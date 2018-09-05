import { Component, Vue } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'

@Component
export default class extends Vue {

  render(h: CreateElement): VNode {
    // return h('h1', 'Hello')
    return <h1>Hello</h1>
  }
}
