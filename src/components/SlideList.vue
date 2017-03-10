<template>
  <md-list class="custom-list md-triple-line">  
    <slide 
        v-for="aslide in slides" 
        v-bind:key="aslide.id" 
        :slide="aslide">
    </slide>
  </md-list>
</template>

<script>
  import Slide from '@/components/Slide'
  export default {
    name: 'SlideList',
    props: ['slides'],
    components: { Slide }
  }
</script>