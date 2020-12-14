<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#int-${type}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ICONFONT_URL } from '@/config'

export default defineComponent({
  props: {
    type: { type: String },
  },
  setup() {
    onMounted(() => {
      const script = document.createElement('script')
      script.src = ICONFONT_URL
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    })
  },
})
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
