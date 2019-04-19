import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
/* 引入初始化样式 */
import './assets/styles/reset.scss'
/* 引入axios */
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
