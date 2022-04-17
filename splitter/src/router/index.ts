import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '@/components/Index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
