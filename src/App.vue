<template>
  <div id="app">
      <div id="fb-root"></div>
      <router-view></router-view>  
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      // Load Facebook SDK
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '450878908577944',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.AppEvents.logPageView();   
      };
    }
  }
</script>

<style lang="scss">
  $pingal-blue: #0383f9;

  body {
    overflow: hidden;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

