import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'

import HomeView from '@/views/home.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',

      component: DefaultLayout,

      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router