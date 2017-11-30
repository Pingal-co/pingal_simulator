<template>
  <div>
    <div id="fb-root"></div>
    <div id="app">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'jwt'
      ])
    },
    created() {
      // Initialize Facebook SDK
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
    },
    mounted() {
      // Only show left bar if signed in 
      if (this.jwt && this.jwt != "null") {
        this.$store.commit('SHOW_LEFT')
      } else {
        this.$store.commit('HIDE_LEFT')
      }
    }
  }
</script>

<style lang="scss">
  $pingal-blue: #0383f9;

  html, body {
    overflow-x:hidden 
  }
  
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    font-family: 'Lato', Helvetica, Arial, sans-serif; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
  }


  ::selection {
    background: $pingal-blue !important; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: $pingal-blue !important; /* Gecko Browsers */
  }
</style>

