import Vue from 'vue'
import Router from 'vue-router'
import ChatLobby from '@/components/ChatLobby'
import Rooms from '@/components/Rooms'
import Room from '@/components/Room'
import SlideList from '@/components/SlideList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ChatLobby,
      children: [
      	{ path: '', component: Rooms },
      	{ path: 'room/:room_id', component: Room},
        { path: 'pingal', component: Room}
      ]
    }
  ]
})
