import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: () => import('@/views/PlayList.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
