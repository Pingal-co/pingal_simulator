<template>
  <div class="top-bar"> <!-- phone-viewport custom-bar  -->
<!--      <md-toolbar class="md-warn">
        <md-button class="md-icon-button" v-if="showMenuIcon" @click.native="$refs.sidenav.toggle()">
          <md-icon>menu</md-icon>
        </md-button>

        <span style="flex: 1"></span>

        <md-button class="md-icon-button" v-if="showLoginIcon" @click="login">
          <md-icon>lock</md-icon>
        </md-button>

     </md-toolbar> -->
  </div>
</template>

<script>

export default {
    props: {
      showLoginIcon: {
        default: true
      },
      showMenuIcon: {
        default: true
      },
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
  }

</style>