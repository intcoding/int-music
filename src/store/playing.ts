// 正在播放的音乐相关状态
import { http } from '@/utils'

export const playing = {
  namespaced: true,
  state: () => ({
    currentSong: null,
    lyric: [],
  }),
  mutations: {
    SET_CURRENT_SONG(state, song) {
      state.currentSong = song
    },
    SET_LYRIC(state, lyric) {
      state.lyric = lyric
      console.log(lyric)
    },
  },
  actions: {
    async setCurrentSong({ commit }, song) {
      commit('SET_CURRENT_SONG', song)
      const res = await http.get('lyric', { params: { id: song.id } })
      if (res.data.nolyric) {
        commit('SET_LYRIC', [['00:00.000', '暂无歌词']])
        return
      }
      const lyric = res.data.lrc.lyric
        .split('\n')
        .map(item => {
          const time = /\[(.*?)\]/.exec(item)?.[1]
          const str = item.replace(/\[(.*?)\]/g, '').trim()
          return [time, str]
        })
        .filter(item => item[0] && item[1])
      commit('SET_LYRIC', lyric)
    },
  },
  getters: {},
}
