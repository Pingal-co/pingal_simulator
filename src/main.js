// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

// Fastclick to load on mobile browser without delay
import FastClick from 'fastclick'
//FastClick.attach(document.body) // initialize fastclick

// npm modules
import randtoken from 'rand-token'
import Cookies from 'js-cookie'

// theme and css
Vue.use(VueMaterial)

// Make non-logged in user session
if (!Cookies.get('session')) {
  Cookies.set('session', randtoken.generate(16), { expires: 365 })
} 

// talking to phoenix
import server from './server'
server()

// keep Router and store in sync
Vue.use(router)
Vue.use(Vuex)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})
