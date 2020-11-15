import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: '28582884532-dn993lletq8rf193457rdtdk2j5t42mj.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
