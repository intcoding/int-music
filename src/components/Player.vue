<template>
  <div v-if="playing.full" class="full-player">
    <header-bar class="header">
      <div class="title">
        <div class="name">{{ song?.name }}</div>
        <div class="author">
          {{ (song?.ar || []).map(r => r.name).join(', ') }}
        </div>
      </div>
    </header-bar>

    <div class="play-actions">
      <div class="bar">
        <div class="left">{{ time(currentTime) }}</div>
        <vue-slider
          class="slider"
          v-model="progress"
          @change="changeProgress"
          :tooltip="'none'"
        />
        <div class="right">{{ time(duration) }}</div>
      </div>

      <div class="icons">
        <icon type="go-prev" />
        <div class="play">
          <icon type="play" v-if="isPausing" @click="play" />
          <icon type="pause" v-if="isPlaying" @click="pause" />
        </div>
        <icon type="go-next" />
      </div>
    </div>

    <audio
      :src="playing.url"
      @canplay="canPlay"
      @timeupdate="updateTime"
      ref="player"
    />
  </div>
  <div class="v-else">
    xixixi
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { mapState } from 'vuex'
import VueSlider from 'vue-slider-component'
import HeaderBar from './HeaderBar.vue'
import Icon from '@/components/Icon.vue'
import { PlayState } from '@/enums'

export default defineComponent({
  setup() {
    const player = ref<HTMLAudioElement>(null)
    const progress = ref(0)
    const duration = ref(0)
    const currentTime = ref(0)
    const playState = ref(PlayState.Loading)

    const canPlay = () => {
      playState.value = PlayState.Playing
      duration.value = player.value.duration
    }

    const updateTime = e => {
      currentTime.value = e.target.currentTime
      progress.value = (e.target.currentTime / player.value.duration) * 100
    }

    const changeProgress = value => {
      const t = (value / 100) * player.value.duration
      player.value.currentTime = t
    }

    const play = async () => {
      await player.value.play()
      playState.value = PlayState.Playing
    }

    const pause = async () => {
      await player.value.pause()
      playState.value = PlayState.Pausing
    }

    const isPlaying = computed(() => playState.value === PlayState.Playing)
    const isPausing = computed(() => playState.value === PlayState.Pausing)

    return {
      player,
      progress,
      currentTime,
      duration,
      canPlay,
      updateTime,
      changeProgress,
      isPlaying,
      isPausing,
      play,
      pause,
    }
  },
  components: { HeaderBar, VueSlider, Icon },
  computed: {
    ...mapState<any>({
      playing: state => state.playing,
    }),
    song() {
      return this.playing.currentSong
    },
  },
  watch: {
    'playing.url'(val) {
      if (!val) return
      this.$nextTick(() => {
        this.player.play()
      })
    },
    playing() {
      console.log(this.playing)
    },
  },
  methods: {
    time: (t: number) => {
      return `${Math.floor(t / 60)}:${(t % 60).toFixed(0).padStart(2, '0')}`
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/style/vars.less';

.full-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: #ffffff;

  .title {
    .name {
      font-size: 34px;
    }

    .author {
      font-size: 24px;
      color: #666666;
    }
  }

  .play-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    padding: 24px 64px;

    .bar {
      display: flex;
      align-items: center;
      font-size: 26px;

      .left {
        width: 60px;
        margin-right: 28px;
        text-align: right;
      }

      .right {
        width: 60px;
        margin-left: 20px;
        text-align: left;
      }

      .slider {
        width: calc(100% - 160px) !important;
      }
    }

    .icons {
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 32px auto 0 auto;

      .icon {
        font-size: 42px;
        color: #888888;
      }

      .play {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 4px solid fade(@primary-color, 80);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
<style lang="scss">
/* 设置组件的主题颜色 */
$themeColor: #28ba85;

/* 导入主题样式 */
@import '~vue-slider-component/lib/theme/default.scss';
</style>
