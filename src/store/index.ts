import { createStore } from 'vuex'
import { playing } from './playing'
import { playlist } from './playlist'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { playing, playlist },
})
