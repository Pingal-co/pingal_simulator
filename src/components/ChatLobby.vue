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
      :fbReinitialize="fbReinitialize"
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
        <!--<loading v-if="slides.length === 0" /> -->
        <slide-list 
          :slides="slides"
          :fbReinitialize="fbReinitialize">
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
        windowWidth: window.innerWidth
      }
    },

    computed: {
      slides() {
        return this.$store.state.slides
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
        return this.$store.state.showRight
      },
      showLeft() {
        return this.$store.state.showLeft
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
      },
      fbReinitialize() {
        // Remove Facebook SDK and reinitialize
        if (typeof FB == "undefined") {
          let FB = null
        } else {
          FB = null
        }  
        // Remove old facebook elements
        let fb_js = document.getElementById("facebook-jssdk");
        let fb_root = document.getElementById("fb-root");
        fb_js.remove(fb_js.selectedIndex);
        fb_root.remove(fb_root.selectedIndex)
        // Re-append Facebook elements to ready for script re-init
        let new_fb_root = document.createElement("div")
        new_fb_root.id = "fb-root"
        let body = document.getElementsByTagName('body')[0]
        body.insertBefore(new_fb_root, body.firstChild);

        let store = this.$store
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '450878908577944',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
          });
          FB.AppEvents.logPageView(); 
          
          FB.checkLoginState = function() {
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                  // Log in or Sign Up
                  let authResponse = response.authResponse
                  FB.api(
                    '/me',
                    'GET',
                    {"fields":"id,name,email,age_range,picture,gender"},
                    function(response) {
                      response.accessToken = authResponse.accessToken
                      store.dispatch('fbConnect', response)
                    }
                  );
                } else {
                  // The person is not logged into this app or we are unable to tell. 
                }
            });
          }  
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      },
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

