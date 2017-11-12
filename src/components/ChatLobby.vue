<template>
  <div class="lobby">

    <!-- Mobile Left and Right Bars -->
    <router-view v-if="mobile" name="leftBar"></router-view>
    <router-view v-if="mobile" name="rightBar"></router-view>

    <md-sidenav v-if="mobile" class="md-left" ref="leftSidenav">
      <room-nav>
      </room-nav>
    </md-sidenav>
    <md-sidenav v-if="mobile" class="md-right" ref="rightSidenav">
        <room-menu></room-menu>
    </md-sidenav>

<!--     <top-bar
      :show-login-icon="false"
      :show-menu-icon="false"
      :toggleLeftSidenav="toggleLeftSidenav"
      :toggleRightSidenav="toggleRightSidenav"
      :mobile="mobile"
      :showLeft="showLeft"
      :showRight="showRight"
    >
    </top-bar> -->
    <router-view name="topBar"></router-view>

    <div class="main">

      <!-- room nav -->
<!--       <div v-if="!mobile && showLeft">
          <room-nav>
          </room-nav>
      </div>  -->
      <router-view name="leftBar"></router-view>
      
      <!-- slides in room -->
      <!--<loading v-if="slides.length === 0" /> -->
      <router-view name="main"></router-view>


      <!-- room menu -->
<!--       <div v-if="!mobile && showRight" class="right-side">
          <room-menu></room-menu>
      </div> -->
      <router-view name="rightBar"></router-view>
    </div>
    
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar'
  import RoomNav from '@/components/RoomNav'
  import RoomMenu from '@/components/RoomMenu'
  import Loading from '@/components/Loading'
  import { mapGetters, mapActions } from 'vuex'

  // npm modules
  import Cookies from 'js-cookie'

  export default {
    name: 'hello',
    components: {
      TopBar,
      RoomNav,
      RoomMenu,
      Loading
    },
    data () {
      return {
        roomChannel: this.$store.state.currentRoomChannel,
        topic: '1',
        windowWidth: window.innerWidth,
      }
    },

    computed: {
        ...mapGetters([
             'getSlidesByRoom'
        ]),
      slides() {
        /*
        let sld = this.$store.state.slides
        console.log("roomChannel")
        console.log(this.roomChannel)
        console.log(sld)
        sld = sld.filter(slide => (slide.to_room_id === this.roomChannel.topic) || (`rooms:${slide.room_id}` === this.roomChannel.topic))
        */
        //let sld = this.getSlidesByRoom
        //console.log("data slides:")
        //console.log(sld)
        return this.getSlidesByRoom
      },

      user() {
        let user = this.$store.state.currentUser
        return user ? user : { _id: 2, name: 'Anonymous', hash: 'Anonymous', avatar: 'mood'}
      },
      mobile() {
        if (this.windowWidth < 768) {
          return true
        } else {
          return false
        }
      },
      showRight() {
        return this.$store.getters.showRight
      },
      showLeft() {
        return this.$store.getters.showLeft
      }
    },

    methods: {
      toggleLeftSidenav() {
        if (this.mobile) {
          this.$refs.leftSidenav.toggle(); 
        } else {
          this.$store.commit("TOGGLE_SHOW_LEFT")
        }   
      },
      toggleRightSidenav() {
        if (this.mobile) {
          this.$refs.rightSidenav.toggle();
        } else {
          this.$store.commit("TOGGLE_SHOW_RIGHT")
        }  
      },
      handleResize() {
        this.windowWidth = window.innerWidth;
      }
    },

    watch: {
      'showLeft': function() {
        if (this.mobile && this.showLeft) {
          this.$refs.leftSidenav.open()
        }
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

  // Do not scope this
  .slides-section {
    overflow-x: hidden;
    height: calc(100vh - 54px);
    width: 100%;
    display: flex;
    flex-flow: column wrap;
  }

  .right-side {
    min-width: 320px;
    max-width: 320px;
    height: calc(100vh - 54px);
    border-left: 1px solid $border-color;
    overflow-y: scroll;
  }

  .md-sidenav-content {
    width: 320px !important;
    max-width: 85%;
  }

</style>

