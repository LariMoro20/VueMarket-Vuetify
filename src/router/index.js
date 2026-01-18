import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: {
        requiresAuth: false
      },
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
      meta: {
        requiresAuth: true
      },
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !token) {
    next({ name: 'login' })
  } else if (!requiresAuth && token && to.name === 'login') {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})
export default router
