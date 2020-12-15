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
      <div class="list">
        <div class="music-item" v-for="item in playlist.tracks" :key="item.id">
          {{ item.name }}
          <div class="ar">{{ item.ar.map(a => a.name).join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/utils'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

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
})
</script>

<style lang="less" scoped>
.playlist-detail {
  margin: -32px;
  height: 100%;

  header {
    display: flex;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 500px;
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
        font-size: 28px;
        color: fade(#eeeeee, 80);
      }

      .title {
        font-size: 36px;
        color: #eeeeee;
      }
      .userinfo {
        display: flex;
        align-items: center;
        margin: 20px 0;

        img {
          width: 48px;
          height: 48px;
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
    box-shadow: 0 0 30px fade(#000000, 10);
    background: #ffffff;
    position: relative;
    z-index: 99;
    border-radius: 12px;
  }

  .music-item {
    font-size: 32px;
  }
}
</style>
