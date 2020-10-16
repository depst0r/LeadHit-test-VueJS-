import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Analytics.vue')
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: () => import('../views/Authorization.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
