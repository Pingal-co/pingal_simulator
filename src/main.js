// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

// Fastclick to load on mobile browser without delay
import FastClick from 'fastclick'
//FastClick.attach(document.body) // initialize fastclick

// theme and css
Vue.use(VueMaterial)

// talking to phoenix
// import server from './server'
// server()

// keep Router and store in sync
// Vue.use(Router)
// Vue.use(Vuex)
// sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
