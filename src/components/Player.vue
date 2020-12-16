<template>
  <div class="player">
    <audio :src="url" ref="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  setup() {
    const player = ref<HTMLAudioElement>(null)

    return { player }
  },
  computed: {
    ...mapState<any>({
      playingSong: state => state.playing.currentSong,
      lyric: state => state.playing.lyric,
      url: state => state.playing.url,
    }),
  },
  watch: {
    url(val) {
      if (!val) return
      this.$nextTick(() => {
        this.player.play()
      })
    },
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
