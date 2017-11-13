<template>
  <div class="top-bar"> <!-- phone-viewport custom-bar  -->

    <div>
    <!-- Left -->
      <md-button class="md-icon-button" @click.native="toggleLeftBar">
        <md-icon :class="['chat-icon', showLeft ? 'highlight-icon' : null]">chat</md-icon>
      </md-button>
    </div>

    <div class="middle-section">
    <!-- Middle -->
      <!-- <div class="room-name">{{currentRoom.name}}</div> -->
      <router-link to="/al" class="pingal-icon">
        <md-avatar>
          <img src="../assets/pingal_play_icon.png" alt="Pingal" />
        </md-avatar>
      </router-link>
      <TopInput />
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
        <md-menu md-direction="bottom left" ref="loginMenu">
          <md-button md-menu-trigger @click.native="logInLoad">
            <div class="profile-button">Login</div>
          </md-button>

          <md-menu-content class="custom-login-dropdown">
            <div class="login-container">
              <login @closeLogin="closeLogin"></login>
            </div>
          </md-menu-content>
        </md-menu>
      </div>

      <md-button class="md-icon-button menu-button" @click.native="toggleRightBar">
        <md-icon :class="['menu-icon', showRight ? 'highlight-icon' : null]">menu</md-icon>
      </md-button>
    </div>
  </div>

</template>

<script>

import Login from '@/components/Login'
import TopInput from '@/components/TopInput'
import Cookies from 'js-cookie'
import fbReinitialize from '@/mixins/fbReinitialize'

export default {
  components: {
    Login,
    TopInput
  },

  mixins: [fbReinitialize],

  props: {
    showLoginIcon: {
      default: true
    },
    showMenuIcon: {
      default: true
    },
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
      let user = this.$store.state.currentUser
      return user
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
    },
    closeLogin() {
      this.$refs.loginMenu.close();
    },
    joinPingal() {
      let user = this.$store.state.currentUser;
      let session = this.$store.state.session;
      let params = user ? {user: user} : {session: session};
      this.$store.dispatch('setCurrentPingalChannel', params);
      this.$store.dispatch('pingalSuggest', {roomChannel: this.$store.state.currentRoomChannel});
    },
    toggleLeftBar() {
      this.$store.commit('TOGGLE_SHOW_LEFT')
    },
    toggleRightBar() {
      this.$store.commit('TOGGLE_SHOW_RIGHT')
    }
  },
}
  
</script>

<style lang="scss">
  $pingal-blue: #0383f9;
  $secondary-color: rgb(57, 73, 171);
  $primary-color-l1: rgb(250, 192, 150);
  $primary-color-l3: rgb(254, 243, 234);

  .top-bar {
    height: 54px;
    width: 100%;
    background-color: rgb(244, 128, 45);
    //background-color: $primary-color-l1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid $primary-color-l1;
  }

  .top-bar-right {
    display: flex;
  }

  .menu-button {
    margin-top: 3px !important;
  }

  .profile-button {
    color: white;
    //color: #d9620c;
    padding-right: 12px;
  }

  .login-container {
    padding: 12px 24px 12px 24px;
  }

  .chat-icon {
    font-size: 28px !important;
    color: white;
    //color: #d9620c;
    right: 5px !important;
  }

  .menu-icon {
    color: white;
  }

  .highlight-icon {
    color: $primary-color-l1;
  }


  .middle-section {
    display: flex;
    align-items: center;
    max-width: 60%;
  }
  .pingal-icon {
    cursor: pointer;
    margin-right: -40px;
    margin-top: 5px;
    z-index: 3;
  }
  .room-name {
    color: white;
    //color: #d9620c;
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