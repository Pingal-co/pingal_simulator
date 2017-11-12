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
      components: ChatLobby,
      children: [
      	{ path: '', components: {
            topBar:,
            leftBar:,
            main:,
            rightBar:, 
          } 
        },
      	{ path: 't/:room_id', components: {
            topBar:,
            leftBar:,
            main:,
            rightBar:, 
          }
        },
        { path: 'al', components: {
            topBar:,
            leftBar:,
            main:,
            rightBar:, 
          }
        }
      ]
    }
  ]
})
