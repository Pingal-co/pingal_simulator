<template>
  <div>
    <div id="fb-root"></div>
    <div id="app">
        <router-view></router-view>  
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
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
    }
  }
</script>

<style lang="scss">
  $pingal-blue: #0383f9;

  html, body {
    overflow-x:hidden 
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif; 
    /*font-family: 'ubuntu', Helvetica, Arial, sans-serif; */
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

