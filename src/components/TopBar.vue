<template>
  <div class="top-bar"> <!-- phone-viewport custom-bar  -->

    <div>
    <!-- Left -->
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon :class="['chat-icon', showLeft ? 'highlight-icon' : null]">chat</md-icon>
      </md-button>
    </div>

    <div>
    <!-- Middle -->
      <div class="room-name">{{currentRoom.name}}</div>
    </div>

    <!-- Right -->
    <div class="top-bar-right">
      <div v-if="user">
        <md-menu md-direction="bottom left">
          <md-button md-menu-trigger>
            <div class="profile-button">{{name}}</div>
          </md-button>

          <md-menu-content>
            <div @click="logOut">
              <md-menu-item class="logout">Logout</md-menu-item>
            </div>
          </md-menu-content>
        </md-menu>
      </div>
      <div v-else>
        <md-menu md-direction="bottom left">
          <md-button md-menu-trigger @click.native="logInLoad">
            <div class="profile-button">Login</div>
          </md-button>

          <md-menu-content>
            <div class="login-container">
              <login></login>
            </div>
          </md-menu-content>
        </md-menu>
      </div>

      <md-button class="md-icon-button menu-button" @click.native="toggleRightSidenav">
        <md-icon :class="['menu-icon', showRight ? 'highlight-icon' : null]">menu</md-icon>
      </md-button>
    </div>
  </div>

</template>

<script>

import Login from '@/components/Login'
import Cookies from 'js-cookie'


export default {
  components: {
    Login
  },

  props: {
    showLoginIcon: {
      default: true
    },
    showMenuIcon: {
      default: true
    },
    toggleLeftSidenav: Function,
    toggleRightSidenav: Function,
    mobile: Boolean,
    showLeft: Boolean,
    showRight: Boolean,
  },

  computed: {
    name() {
      var user = this.$store.state.currentUser
      if (user) {
        return user.name
      } else {
        return ''
      }
    },
    user() {
      return this.$store.state.currentUser
    },
    currentRoom() {
      return this.$store.state.currentRoom
    },
  },

  methods: {
    logIn() {
      console.log('login')
    },
    logOut() {
      console.log("logged out")
      this.$store.commit('LOG_OUT')
    },
    logInLoad() {
      // Remove Facebook SDK and reinitialize
      FB = null
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

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '450878908577944',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();   
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }
  },
}
  
</script>

<style lang="scss">
  $pingal-blue: #0383f9;
  $secondary-color: rgb(57, 73, 171);
  $primary-color-l1: rgb(250, 192, 150);

  .top-bar {
    height: 54px;
    width: 100%;
    background-color: rgb(244, 128, 45);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top-bar-right {
    display: flex;
  }

  .menu-button {
    margin-top: 3px !important;
  }

  .profile-button {
    color: white;
    padding-right: 12px;
  }

  .login-container {
    padding: 12px 24px 12px 24px;
  }

  .chat-icon {
    font-size: 28px !important;
    color: white;
    right: 5px !important;
  }

  .menu-icon {
    color: white;
  }

  .highlight-icon {
    color: $primary-color-l1;
  }

  .room-name {
    color: white;
    font-size: 22px;
  }

  .md-menu-content {
    margin-top: 45px !important;
    min-width: 240px !important;
    // padding: 6px 12px 9px 12px;
    background-color: white;
  }

  .md-list {
    padding: 0px !important;
  }

  .logout {
    width: 100%;
  }

  .md-list-item-container {
    display: flex;
    justify-content: center !important;
  }
</style>