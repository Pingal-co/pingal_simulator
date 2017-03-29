<template>
  <div class="lobby">
    <top-bar
      :show-login-icon="false"
      :show-menu-icon="false"
      :toggleLeftSidenav="toggleLeftSidenav"
      :toggleRightSidenav="toggleRightSidenav"
      :mobile="mobile"
      :showLeft="showLeft"
      :showRight="showRight"
    >
    </top-bar>

    <div class="main">

      <!-- room nav -->
      <div v-if="mobile">
        <md-sidenav class="md-left" ref="leftSidenav">
          <room-nav>
          </room-nav>
        </md-sidenav>
      </div>
      <div v-else>
        <div v-if="showLeft">
          <room-nav>
          </room-nav>
        </div>
      </div>  
      
      <!-- slides in room -->
      <div class="slides-section">   
        <loading v-if="slides.length === 0" />
        <slide-list v-else
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

      <!-- room menu -->
      <div v-if="mobile">
        <md-sidenav class="md-right" ref="rightSidenav">        
          <room-menu></room-menu>
        </md-sidenav>
      </div>
      <div v-else>
        <div v-if="showRight" class="right-side">
          <room-menu></room-menu>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar'
  import RoomNav from '@/components/RoomNav'
  import RoomMenu from '@/components/RoomMenu'
  import SlideList from '@/components/SlideList'
  import InputToolBar from '@/components/InputToolBar'
  import Loading from '@/components/Loading'

  // npm modules
  import Cookies from 'js-cookie'

  export default {
    name: 'hello',
    components: {
      TopBar,
      RoomNav,
      RoomMenu,
      SlideList,
      InputToolBar,
      Loading
    },
    data () {
      return {
        roomChannel: this.$store.state.currentRoomChannel,
        topic: '1',
        user: { _id: 2, name: 'Sam', hash: 'Sam', avatar: 'mood'},
        windowWidth: window.innerWidth,
        showRight: true,
        showLeft: true,
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
        if (this.mobile) {
          this.$refs.leftSidenav.toggle(); 
        } else {
          this.showLeft = !this.showLeft
        }
        
      },
      toggleRightSidenav() {
        if (this.mobile) {
          this.$refs.rightSidenav.toggle();
        } else {
          this.showRight = !this.showRight
        }  
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Removed "scoped" as it's making CSS overides of the MD framework impossible -->
<style lang="scss">
  $border-color: rgb(225, 225, 225);
  $primary-darker-color: rgb(217, 98, 12);

  h1, h2 {
    font-weight: normal;
  }

  .lobby {
  }

  .main {
    display: flex;
  }

  .slides-section {
    overflow-x: hidden;
    height: calc(100vh - 54px);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .right-side {
    min-width: 360px;
    max-width: 360px;
    height: calc(100vh - 54px);
    border-left: 1px solid $border-color;
    overflow-y: scroll;
  }

  .md-sidenav-content {
    width: 360px !important;
  }

</style>

