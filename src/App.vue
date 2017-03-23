<template>
  <div id="app">
      <router-view></router-view>  
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  $pingal-blue: #0383f9;
  
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

