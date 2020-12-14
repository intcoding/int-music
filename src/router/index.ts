import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('@/views/Music.vue'),
  },
  {
    path: '/found',
    name: 'Found',
    component: () => import('@/views/Found.vue'),
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
