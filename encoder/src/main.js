import '@fontsource/material-icons'
import '@fontsource/roboto'

import Application from './Application.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  render: h => h(Application),
  router,
  vuetify,
  store
}).$mount('#application')
