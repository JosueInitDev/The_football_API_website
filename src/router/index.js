import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Docs from '../pages/Docs.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import Account from '../pages/Account.vue'
import Pricing from '../pages/Pricing.vue'
import Contact from '../pages/Contact.vue'
import { useAuthStore } from '@/stores/auth'
import Subscribe from '@/pages/Subscribe.vue'
import TermsOfService from '@/pages/TermsOfService.vue'
import Error404 from '@/pages/Error404.vue'
import PrivacyNotice from '@/pages/PrivacyNotice.vue'
import RefundPolicy from '@/pages/RefundPolicy.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/docs', component: Docs },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/account', component: Account, meta: { requiresAuth: true } },
  { path: '/pricing', component: Pricing },
  { path: '/contact', component: Contact },
  { path: '/subscribe', component: Subscribe, meta: { requiresAuth: true } },
  { path: '/terms-of-service', component: TermsOfService },
  { path: '/privacy-notice', component: PrivacyNotice },
  { path: '/refund-policy', component: RefundPolicy },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')  // Block access → go to login. Created by Josué - jose.init.dev@
  } else {
    next()
  }
})

export default router