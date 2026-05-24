import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'

import HomeView from '@/views/home.vue'

import Create from '@/views/Create.vue'

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
        {
          path: 'create',
          name: 'create',
          component: Create,
        },
        {
          path: ':id',
          name: 'create',
          component: Create,
        },
      ],
    },
  ],
})

export default router