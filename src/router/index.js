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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/pages/CategoriesPage.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('@/pages/ProductsPage.vue'),
      },
      ]
    }],
})

export default router
