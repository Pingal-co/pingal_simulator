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

          <md-menu-content class="custom-login-dropdown">
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
    fbReinitialize: Function,
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
      let user = this.$store.state.currentUser
      console.log("user is")
      console.log(user)
      console.log(user == null)
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
      this.fbReinitialize()
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
    // min-width: 240px !important;
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

  .custom-login-dropdown {
    width: 278px !important;
  }
</style>