<template>
  <div class="player">
    <audio :src="url" ref="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const url = ref()
    const player = ref<HTMLAudioElement>(null)

    return { url, player }
  },
})
</script>

<style lang="less" scoped>
.player {
  &.full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background: #ffffff;
  }
}
</style>