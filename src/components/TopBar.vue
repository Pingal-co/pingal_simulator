<template>
  <div class="top-bar"> <!-- phone-viewport custom-bar  -->
     <!-- <md-toolbar class="md-warn">
        <md-button class="md-icon-button" v-if="showMenuIcon" @click.native="$refs.sidenav.toggle()">
          <md-icon>menu</md-icon>
        </md-button>

        <span style="flex: 1"></span>

        <md-button class="md-icon-button" v-if="showLoginIcon" @click="login">
          <md-icon>lock</md-icon>
        </md-button>

     </md-toolbar> -->
    <md-button v-if="mobile" class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon class="chat-icon">chat</md-icon>
    </md-button>
    <div v-else></div> <!-- Left flush -->

    <div class="room-name">{{currentRoom.name}}</div>

    <div v-if="user">
      <md-menu md-direction="bottom left">
        <md-button md-menu-trigger>
          <div class="profile-button">{{name}}</div>
        </md-button>

        <md-menu-content>
          <div @click="logOut"><md-menu-item>Logout</md-menu-item></div>
        </md-menu-content>
      </md-menu>
    </div>
    <div v-else>
      <md-menu md-direction="bottom left">
        <md-button md-menu-trigger>
          <div class="profile-button">Login</div>
        </md-button>

        <md-menu-content>
          <div class="login-container">
            <login />
          </div>
        </md-menu-content>
      </md-menu>
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
    mobile: Boolean,
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
    }
  },

  methods:{
    logIn() {
      console.log('login')
    },
    logOut() {
      console.log("logged out")
      this.$store.commit('LOG_OUT')
    }
  }
}
  
</script>

<style>
  .top-bar {
    height: 54px;
    width: 100%;
    background-color: rgb(244, 128, 45);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .profile-button {
    color: white;
    padding-right: 12px;
  }

  .login-container {
    padding: 4px 12px 4px 12px;
  }

  .chat-icon {
    font-size: 28px !important;
    color: white;
    right: 5px !important;
  }

  .room-name {
    color: white;
    font-size: 22px;
  }

  .md-menu-content {
    margin-top: 45px !important;
    min-width: 240px !important;
    padding: 6px 12px 9px 12px;
    background-color: white;
  }

</style>