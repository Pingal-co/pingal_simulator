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
      <md-icon class="md-size-2x">home</md-icon>
    </md-button>
    <md-icon></md-icon>
     <div class="profile-button">{{name}}</div>
  </div>
</template>

<script>

import Cookies from 'js-cookie'

export default {
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
      }
    },

    methods:{
      login: function () {
        console.log('login')
      },
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
    justify-content: flex-end;
  }

  .profile-button {
    color: white;
    padding-right: 12px;
  }

</style>