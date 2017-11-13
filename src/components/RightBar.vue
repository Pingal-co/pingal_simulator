<template>
	<md-sidenav v-if="mobile" class="md-right" ref="rightBar">
  	<room-menu></room-menu>
  </md-sidenav>
  <div v-else-if="!mobile && showRight" class="right-side">
    <room-menu></room-menu>
  </div>
</template>

<script>
  import RoomMenu from '@/components/RoomMenu'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      RoomMenu
    },
    computed: {
      ...mapGetters([
         'mobile',
         'showRight'
      ]),
    },
    watch: {
      showRight: function() {
        if (this.mobile) {
          this.$refs.rightBar.toggle()
        }
      }
    },
  }

</script>

<style lang="scss" scoped>
	
</style>