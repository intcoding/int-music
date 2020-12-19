<template>
  <div class="playlist-detail" v-if="playlist">
    <header>
      <div
        class="bg"
        :style="{ background: `url(${playlist.coverImgUrl})` }"
      ></div>
      <div class="mask"></div>
      <div class="left">
        <img :src="playlist.coverImgUrl" />
      </div>
      <div class="right">
        <p class="title">{{ playlist.name }}</p>
        <div class="userinfo">
          <img :src="playlist.creator.avatarUrl" />
          <p class="username">{{ playlist.creator.nickname }}</p>
        </div>
        <p class="desc">{{ playlist.description }}</p>
      </div>
    </header>
    <div class="card">
      <div class="actions">
        <div class="play-all">
          <icon type="play1" />
          播放全部
        </div>
        <div class="star"><icon type="star" />收藏</div>
      </div>
      <div class="list">
        <div
          class="music-item"
          v-for="(item, index) in playlist.tracks"
          :key="item.id"
          @click="playSong(item)"
        >
          <div class="index">
            {{ index + 1 }}
          </div>
          <div class="mid">
            <div class="name">{{ item.name }}</div>
            <div class="ar">{{ item.ar.map(a => a.name).join(', ') }}</div>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { mapActions } from 'vuex'
import { useRoute } from 'vue-router'
import { http } from '@/utils'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  setup() {
    const state = reactive({
      playlist: null,
    })

    const route = useRoute()
    const id = route.params.id

    onMounted(async () => {
      const res = await http.get(`/playlist/detail?id=${id}`)
      state.playlist = res.data.playlist
    })

    return toRefs(state)
  },
  components: { Icon },
  methods: {
    ...mapActions({ playSong: 'playing/playSong' }),
  },
})
</script>

<style lang="less" scoped>
@import '@/style/vars.less';

.playlist-detail {
  margin: -32px;

  header {
    display: flex;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 480px;
    display: flex;
    align-items: flex-start;
    padding: 60px 40px;

    .bg {
      filter: blur(50px);
      position: absolute;
      left: -100px;
      top: -100px;
      right: -100px;
      bottom: -100px;
      background-size: cover;
      background-position: center center;
      opacity: 0.5;
      z-index: 1;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: fade(#000000, 5);
      z-index: 1;
    }

    .left,
    .right {
      position: relative;
      z-index: 2;
    }

    .right {
      margin-left: 32px;

      p {
        font-size: 24px;
        color: fade(#eeeeee, 80);
      }

      .title {
        font-size: 32px;
        color: #eeeeee;
        font-weight: 500;
      }

      .userinfo {
        display: flex;
        align-items: center;
        margin: 24px 0;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .username {
          margin-left: 12px;
        }
      }

      .desc {
        width: 420px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    img {
      width: 220px;
      height: 220px;
      border-radius: 12px;
    }
  }

  .card {
    width: 90%;
    margin: -120px 5% 0 5%;
    box-shadow: 0 0 50px fade(#666666, 10);
    background: #ffffff;
    position: relative;
    z-index: 99;
    border-radius: 12px;
  }

  .actions {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px;

    .play-all {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: @primary-color;

      .icon {
        font-size: 40px;
        margin-right: 8px;
      }
    }

    .star {
      font-size: 24px;
      color: fade(@primary-color, 60);

      .icon {
        font-size: 32px;
        margin-right: 8px;
      }
    }
  }

  .music-item {
    font-size: 26px;
    display: flex;
    align-items: center;
    padding: 24px 32px;

    .index {
      width: 56px;
      color: #959597;
    }

    .mid {
      width: 400px;

      .ar {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 24px;
        color: #959597;
      }
    }
  }
}
</style>
