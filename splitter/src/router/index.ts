import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Combining from '@/components/Combining.vue'
import Index from '@/components/Index.vue'
import Splitting from '@/components/Splitting.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Index,
    redirect: '/splitting',
    children: [
      {
        path: 'splitting',
        component: Splitting
      },
      {
        path: 'combining',
        component: Combining
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
