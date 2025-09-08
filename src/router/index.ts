import Board from '@/views/Board.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' }, // ← 默认进登录
    { path: '/login', name: 'login', component: Login },
    { path: '/board/:room', name: 'board', component: Board },
  ],
})
