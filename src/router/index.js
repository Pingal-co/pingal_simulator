import Vue from 'vue'
import Router from 'vue-router'
import ChatLobby from '@/components/ChatLobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatLobby',
      component: ChatLobby
    }
  ]
})
