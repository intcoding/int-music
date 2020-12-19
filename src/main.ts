import { createApp } from 'vue'
// import VConsole from 'vconsole'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/global.less'

import './utils/rem'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

if (process.env.NODE_ENV === 'development') {
  // new VConsole()
}
