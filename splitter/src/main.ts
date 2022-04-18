import Vue from 'vue'
import Application from '@/Application.vue'
import router from '@/router'
import store from '@/store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Application)
}).$mount('#application')
