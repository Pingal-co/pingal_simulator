<template>
  <md-list class="custom-list md-triple-line slide-list">  
    <slide 
        v-for="slide in slides" 
        :key="slide.id" 
        :slide="slide"
        :fbReinitialize="fbReinitialize">
    </slide>
    <li id="scrollAnchor"></li>
  </md-list>
</template>

<script>
  import Slide from '@/components/Slide'
  export default {
    name: 'SlideList',
    props: ['slides', 'fbReinitialize'],
    components: { Slide },
    updated() {
      // Scroll most recent into view
      var scrollAnchor = this.$el.querySelector('#scrollAnchor')
      scrollAnchor.scrollIntoView()
    },
    mounted() {
      // Scroll most recent into view
      var scrollAnchor = this.$el.querySelector('#scrollAnchor')
      scrollAnchor.scrollIntoView()
    }
  }
</script>

<style lang="scss" scoped>

  .slide-list {
    // padding-bottom: 54px !important;
    padding-top: 0px !important;
    overflow-y: scroll;
    flex: 1;
    width: 100%;
    display: block !important;
  }

</style>