<template>
  <md-list class="custom-list md-triple-line slide-list">  
    <slide 
        v-for="slide in slides" 
        v-bind:key="slide.id" 
        :slide="slide">
    </slide>
    <li id="scrollAnchor"></li>
  </md-list>
</template>

<script>
  import Slide from '@/components/Slide'
  export default {
    name: 'SlideList',
    props: ['slides'],
    components: { Slide },
    updated() {
      // Scroll most recent into view
      var scrollAnchor = this.$el.querySelector('#scrollAnchor')
      scrollAnchor.scrollIntoView()
    }
  }
</script>

<style lang="scss" scope>

  .slide-list {
    padding-bottom: 54px !important;
    padding-top: 0px !important;
    overflow-y: scroll;
    max-height: calc(100vh - 108px);
    width: 100%;
    display: block !important;
  }

</style>