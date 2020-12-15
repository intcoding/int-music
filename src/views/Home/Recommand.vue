<template>
  <div>
    <h2>推荐歌单</h2>

    <div class="playlists">
      <div class="playlist-item" v-for="item in playlists" :key="item.id">
        <img :src="item.coverImgUrl" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { http } from '@/utils'

interface PlaylistItem {
  name: string
  id: number
  coverImgUrl: string
  playCount: number
}

export default defineComponent({
  setup() {
    const playlists = ref<PlaylistItem[]>([])
    onMounted(async () => {
      const res = await http.get('/top/playlist')
      playlists.value = res.data.playlists.slice(0, 9)
    })
    return { playlists }
  },
})
</script>

<style lang="less" scoped>
h2 {
  font-size: 32px;
  margin-top: 24px;
  margin-bottom: 32px;
}

.playlists {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}

.playlist-item {
  height: 300px;

  img {
    width: 100%;
    border-radius: 16px;
  }

  p {
    line-height: 32px;
    height: 64px;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
