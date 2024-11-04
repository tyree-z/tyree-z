import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Home View
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    // {
    //   // About View
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      // Resume View
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeView.vue')
    },
    {
      path: '/nemea',
      name: 'nemea',
      component: () => import('../views/NemeaView.vue')
    },
    {
      // Catch all (404)
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

export default router;
