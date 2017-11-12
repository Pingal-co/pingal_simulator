import Vue from 'vue'
import Router from 'vue-router'
import ChatLobby from '@/components/ChatLobby'
import Rooms from '@/components/Rooms'
import Room from '@/components/Room'
import SlideList from '@/components/SlideList'

import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'
import Main from '@/components/Main'
import RightBar from '@/components/RightBar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: ChatLobby,
      children: [
      	{ path: '', components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Main,
            rightBar: RightBar, 
          } 
        },
      	{ path: 't/:room_id', components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Main,
            rightBar: RightBar, 
          }
        },
        { path: 'al', components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Main,
            rightBar: RightBar, 
          }
        }
      ]
    }
  ]
})
