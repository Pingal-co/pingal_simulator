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
          :slides="slides">
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
        slides: require('@/store/data'),
        roomNav: require('@/store/room_nav_data'),
        room: joinWorldChannel(),
        topic: '1',
        user: { _id: 1, name: 'Pingal', hash: 'Pingal', avatar: 'mood'},
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

  }
</style>

