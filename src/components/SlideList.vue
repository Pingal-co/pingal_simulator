<template>
  <md-list class="custom-list md-triple-line slide-list">  
    <slide 
        v-for="slide in slides" 
        v-bind:key="slide.id" 
        :slide="slide"
        :room="room">
    </slide>
    <li id="scrollAnchor"></li>
  </md-list>
</template>

<script>
  import Slide from '@/components/Slide'
  export default {
    name: 'SlideList',
    props: ['slides', 'room'],
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
  }

</style>