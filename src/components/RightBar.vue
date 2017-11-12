<template>
	<md-sidenav v-if="mobile" class="md-right" ref="rightSidenav">
  	<room-menu></room-menu>
  </md-sidenav>
  <div v-else-if="!mobile && showRight" class="right-side">
      <room-menu></room-menu>
  </div>
</template>

<script>
  import RoomMenu from '@/components/RoomMenu'

  export default {
    components: {
      RoomMenu
    }
  }

</script>

<style lang="scss" scoped>
	
</style>