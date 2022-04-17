import Vue from 'vue'
import Application from '@/Application.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Application)
}).$mount('#application')
