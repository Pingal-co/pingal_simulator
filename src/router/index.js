import Vue from 'vue'
import Router from 'vue-router'
import ChatLobby from '@/components/ChatLobby'
import Rooms from '@/components/Rooms'
import Room from '@/components/Room'
import SlideList from '@/components/SlideList'
import MagicLogin from '@/components/MagicLogin'

import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ChatLobby,
      children: [
      	{ path: '', components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Room,
            rightBar: RightBar, 
          } 
        },
        { path: 'al', components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Room,
            rightBar: RightBar, 
          }
        },
        { path: 't/:topic_id',
          name: 'topic', 
          components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Rooms,
            rightBar: RightBar, 
          },
        },
        { path: 'c/:chat_id',
          name: 'chat',
          components: {
            topBar: TopBar,
            leftBar: LeftBar,
            main: Room,
            rightBar: RightBar, 
          }
        }
      ]
    },
    {
      path: '/login_magic_link/:magic_link_key',
      component: MagicLogin
    }
  ]
})
