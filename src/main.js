import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
/* 引入初始化样式 */
import './assets/styles/reset.scss'
/* 引入axios */
import axios from 'axios'
/* 引入fastclick */
import FastClick from 'fastclick'

Vue.config.productionTip = false
Vue.prototype.$http = axios
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
