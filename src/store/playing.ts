// 正在播放的音乐相关状态
import { LoopMode, PlayState } from '@/enums'
import { http } from '@/utils'

export const playing = {
  namespaced: true,
  state: () => ({
    currentSong: null,
    lyric: [],
    url: '',
    mode: LoopMode.Loop,
    full: false,
  }),
  mutations: {
    SET_CURRENT_SONG(state, song) {
      state.currentSong = song
    },
    SET_LYRIC(state, lyric) {
      state.lyric = lyric
    },
    SET_URL(state, url) {
      state.url = url
    },
    SET_STATE(state, s: PlayState) {
      state.state = s
    },
    SET_MODE(state, m: LoopMode) {
      state.mode = m
    },
    SET_FULL(state, isFull: boolean) {
      state.full = isFull
    },
  },
  actions: {
    async playSong({ commit }, song) {
      commit('SET_CURRENT_SONG', song)
      const [res1, res2] = await Promise.all([
        http.get('/song/url', { params: { id: song.id } }),
        http.get('/lyric', { params: { id: song.id } }),
      ])

      commit('SET_URL', res1.data.data?.[0].url)

      if (res2.data.nolyric) {
        commit('SET_LYRIC', [[0, '暂无歌词']])
        return
      }
      const lyric = res2.data.lrc.lyric
        .split('\n')
        .map(item => {
          const time = /\[(.*?)\]/.exec(item)?.[1]
          if (!time) return []

          const [m, s, ss] = time.split(/:|\./).map(i => +i)
          const t = m * 60 + s + ss / 1000

          const str = item.replace(/\[(.*?)\]/g, '').trim()
          return [t, str]
        })
        .filter(item => item[0] && item[1])
      commit('SET_LYRIC', lyric)
      commit('SET_FULL', true)
    },
  },
  getters: {},
}
