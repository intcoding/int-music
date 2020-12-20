<template>
  <div v-if="playing.full && song" class="full-player">
    <div
      class="bg"
      :style="{ 'background-image': `url(${song.al.picUrl})` }"
    ></div>

    <header-bar class="header">
      <div class="title">
        <div class="name">{{ song.name }}</div>
        <div class="author">
          {{ (song.ar || []).map(r => r.name).join(', ') }}
        </div>
      </div>

      <template v-slot:actions>
        <Icon type="down" class="close" @click="close" />
      </template>
    </header-bar>

    <div class="content">
      <div class="cover" :class="{ rotate: isPlaying }">
        <img :src="song.al.picUrl" />
      </div>

      <div class="lyric-container">
        <div class="lyrics" ref="lyrics">
          <div
            class="lyric-line"
            v-for="(ly, index) in playing.lyric"
            :key="index"
            :class="{ active: currentLyricIdx === index }"
          >
            {{ ly[1] }}
          </div>
        </div>
      </div>
    </div>

    <div class="play-actions">
      <div class="bar">
        <div class="left">{{ formatTime(currentTime) }}</div>
        <vue-slider
          class="slider"
          v-model="progress"
          @change="changeProgress"
          :tooltip="'none'"
        />
        <div class="right">{{ formatTime(duration) }}</div>
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
  </div>
  <div v-else class="player-mini" @click="open">
    <svg
      :height="circleOption.width"
      :width="circleOption.width"
      x-mlns="http://www.w3.org/200/svg"
    >
      <circle
        class="circle1"
        x="0"
        y="0"
        :r="circleOption.radius"
        :cx="circleOption.cx"
        :cy="circleOption.cy"
        :stroke-width="circleOption.strokeWidth"
        fill="none"
      />

      <circle
        class="circle2"
        :r="circleOption.radius"
        :cx="circleOption.cx"
        :cy="circleOption.cy"
        :stroke-width="circleOption.strokeWidth"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
        fill="none"
        stroke-linecap="round"
        transform="rotate(-90)"
        transform-origin="center"
      />
    </svg>

    <div
      class="mini-cover"
      :class="{ rotate: isPlaying }"
      :style="{
        'background-image': `url(${song?.al?.picUrl ||
          require('@/assets/die.png')})`,
      }"
    />
  </div>

  <audio
    :src="playing.url"
    @canplay="canPlay"
    @timeupdate="updateTime"
    ref="player"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, nextTick, reactive } from 'vue'
import { useStore } from 'vuex'
import VueSlider from 'vue-slider-component'
import HeaderBar from './HeaderBar.vue'
import Icon from '@/components/Icon.vue'
import { PlayState } from '@/enums'

export default defineComponent({
  setup() {
    const store = useStore()
    const player = ref<HTMLAudioElement>(null)
    const lyrics = ref<HTMLDivElement>(null)
    const progress = ref(0)
    const duration = ref(0)
    const currentTime = ref(0)
    const playState = ref(PlayState.Loading)
    const currentLyricIdx = ref(0)

    const playing = reactive(store.state.playing)
    const song = computed(() => playing.currentSong)

    watch(
      () => playing.url,
      async val => {
        if (!val) return
        await nextTick()
        player.value.play()
      },
    )

    watch(
      () => playing.full,
      val => {
        const app = document.querySelector('.layout .content') as HTMLDivElement
        if (val) {
          app.style.overflow = 'hidden'
        } else {
          app.style.overflow = 'auto'
        }
      },
    )

    const canPlay = () => {
      playState.value = PlayState.Playing
      duration.value = player.value.duration
    }

    const updateTime = e => {
      const ct = e.target.currentTime
      currentTime.value = ct
      progress.value = (ct / player.value.duration) * 100

      // 非全屏状态下不更新歌词
      if (!playing.full || playing.lyric.length === 1) return
      // update lyric
      const lyricHeight = lyrics.value.children?.[0].clientHeight
      playing.lyric.forEach((ly, index) => {
        if (index === playing.lyric.length) return
        // 提前 0.5s 切换歌词
        if (ly[0] - 0.5 < ct && playing.lyric[index + 1][0] > ct) {
          currentLyricIdx.value = index
          lyrics.value.style.top =
            -Math.max(lyricHeight * (index - 4), 0) + 'px'
        }
      })
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

    const formatTime = (t: number) => {
      return `${Math.floor(t / 60)}:${(t % 60).toFixed(0).padStart(2, '0')}`
    }

    const calcPx = (n: number) =>
      (document.documentElement.clientWidth / 750) * n

    const circleOption = {
      radius: calcPx(46),
      strokeWidth: calcPx(8),
      cx: calcPx(50),
      cy: calcPx(50),
      width: calcPx(100),
    }

    const circumference = circleOption.radius * 2 * Math.PI

    const strokeDasharray = `${circumference} ${circumference}`
    const strokeDashoffset = computed(() => {
      return circumference - (progress.value / 100) * circumference
    })

    return {
      player,
      lyrics,
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
      currentLyricIdx,
      playing,
      song,
      formatTime,
      close: () => {
        store.commit('playing/SET_FULL', false)
      },
      open: () => {
        if (!song.value) return
        store.commit('playing/SET_FULL', true)
      },
      circleOption,
      strokeDasharray,
      strokeDashoffset,
    }
  },
  components: { HeaderBar, VueSlider, Icon },
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
  overflow: hidden;
  z-index: 99999;
  background: @primary-color;

  .bg {
    background-size: cover;
    background-position: center center;
    filter: blur(50px) brightness(0.5);
    position: absolute;
    left: -200px;
    top: -200px;
    bottom: -200px;
    right: -200px;
    z-index: 1;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: fade(@primary-color, 10);
      z-index: 1;
    }
  }

  .header {
    position: relative;
    z-index: 2;

    .close {
      font-size: 36px;
      color: @primary-color;
    }
  }

  .title {
    .name {
      font-size: 34px;
      color: #eeeeee;
    }

    .author {
      font-size: 24px;
      color: #dddddd;
    }
  }

  .content {
    height: calc(100vh - 360px);
    position: relative;
    overflow: hidden;

    .cover {
      margin-top: 90px;
      text-align: center;
      position: relative;
      z-index: 9;

      img {
        width: 360px;
        height: 360px;
        border-radius: 50%;
      }

      &.rotate {
        animation: spin 20s linear infinite;
      }
    }

    .lyric-container {
      position: relative;
      z-index: 2;
      height: 450px;
      overflow: hidden;
      margin-top: 64px;
    }

    .lyrics {
      position: relative;
      transition: 0.3s all ease-in-out;

      .lyric-line {
        text-align: center;
        color: #888888;
        font-size: 25px;
        line-height: 50px;

        &.active {
          color: #ffffff;
          transform: scale(1.1);
        }
      }
    }
  }

  .play-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    padding: 24px 64px;
    z-index: 2;

    .bar {
      display: flex;
      align-items: center;
      font-size: 26px;
      color: #ffffff;

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
      margin: 36px auto 0 auto;

      .icon {
        font-size: 42px;
        color: #ffffff;
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

.player-mini {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  position: relative;

  .mini-cover {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background-size: cover;

    &.rotate {
      animation: spin 20s linear infinite;
    }
  }

  svg {
    position: absolute;
    left: -8px;
    top: -8px;

    .circle1 {
      stroke: fade(@primary-color, 40);
    }

    .circle2 {
      stroke: fade(@primary-color, 80);
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
/* 设置组件的主题颜色 */
$themeColor: #28ba85;

/* 导入主题样式 */
@import '~vue-slider-component/lib/theme/default.scss';
</style>
