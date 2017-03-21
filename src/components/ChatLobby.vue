<template>
  <div class="lobby">
    <top-bar
      :show-login-icon="false"
      :show-menu-icon="false"
      :toggleLeftSidenav="toggleLeftSidenav"
      :mobile="mobile"
    >
    </top-bar>

    <div class="main">

      <div v-if="mobile">
        <md-sidenav class="md-left" ref="leftSidenav">
          <room-nav>
          </room-nav>
        </md-sidenav>
      </div>
      <div v-else>
          <room-nav>
          </room-nav>
      </div>  
         
      <div class="slides-section">
        <slide-list
          :slides="slides">
        </slide-list>

        <input-tool-bar
          :mute-speaker="true"
          :topic="topic"
          :user="user"
          :mobile="mobile"
          >
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
        room: this.$store.state.currentRoom,
        topic: '1',
        user: { _id: 2, name: 'Sam', hash: 'Sam', avatar: 'mood'},
        windowWidth: window.innerWidth,
      }
    },

    computed: {
      slides() {
        return this.$store.state.slides
      },
      mobile() {
        if (this.windowWidth < 768) {
          return true
        } else {
          return false
        }
      }
    },

    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle(); 
      },
      handleResize() {
        this.windowWidth = window.innerWidth;
      }
    },

    mounted() {
      window.addEventListener('resize', this.handleResize)
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
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

