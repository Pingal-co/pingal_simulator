<template>
  <div class="lobby">
    <top-bar
      :show-login-icon="false"
      :show-menu-icon="false"
    >
    </top-bar>

    <div class="main">
      <room-nav 
        :rooms="roomNav">
      </room-nav>
         
      <div class="slides-section">
        <slide-list
          :slides="slides"
          :room="room">
        </slide-list>

        <input-tool-bar
          :mute-speaker="true"
          :room="room"
          :topic="topic"
          :user="user">
        </input-tool-bar>
      </div>
    </div>
    
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar'
  import RoomNav from '@/components/RoomNav'
  import SlideList from '@/components/SlideList'
  import InputToolBar from '@/components/InputToolBar'
  import {joinWorldChannel} from '@/chatserver'

  // npm modules
  import Cookies from 'js-cookie'

  export default {
    name: 'hello',
    components: {
      TopBar,
      RoomNav,
      SlideList,
      InputToolBar
    },
    data () {
      return {
        roomNav: [], // require('@/store/room_nav_data'),
        room: joinWorldChannel(Cookies.get('session')),
        topic: '1',
        user: { _id: 2, name: 'Sam', hash: 'Sam', avatar: 'mood'},
      }
    },

    computed: {
      slides() {
        return this.$store.state.slides
      }
    }
  }

/*
[ 
          {
            _id: Math.round(Math.random() * 1000000),
            body: "Hey, my name's Pingal. I'm a personal superconnector.",
            user: { _id: 1, avatar: 'collections', name: 'Pingal' },
            timestamp: new Date(Date.now()),
            location: { latitude: 48.864601, longitude: 2.398704},
            channels: [{'topic': 'tea', 'topic_id': 'room:1:15'},{'topic': 'tech', 'topic_id': 'room:1:16'}],
            buttons: [{id: 1, text: 'Action 1'}, {id: 2, text: 'Action 2'}]
          }
        ]
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  .lobby {
  }

  .main {
    display: flex;
  }

  .slides-section {
    overflow-y: scroll;
    height: calc(100vh - 108px);
    width: 100%;
  }
</style>

