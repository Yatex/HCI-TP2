import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from './plugins/vue-cookies';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
