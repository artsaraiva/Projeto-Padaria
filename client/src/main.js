
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md' // 'md' || 'mdi' || 'fa' || 'fa4'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
