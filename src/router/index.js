import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/LoginLayout.vue'),
      children: [{
        path: '',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/RegisterPage.vue'),
      }]
    },

    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [{
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/categorias',
        name: 'categorias',
        component: () => import('@/pages/CategoriesPage.vue'),
      }]
    }],
})

export default router
