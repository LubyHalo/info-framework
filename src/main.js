// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import EasyScroll from 'easyscroll'

import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import './static/css/reset.css'
import '@/static/css/base.css'

import App from './App'
import router from './router'
import store from './store'

import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(EasyScroll)
Vue.config.productionTip = false
require('./mock/mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.filter('getYMD', function (input) {
  return input.split(' ')[0]
})
