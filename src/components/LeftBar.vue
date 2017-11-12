<template>
	<md-sidenav v-if="mobile" class="md-left" ref="leftSidenav">
    <room-nav></room-nav>
  </md-sidenav>
	<div v-else-if="!mobile && showLeft">
	  <room-nav></room-nav>
	</div> 
</template>

<script>
  import RoomNav from '@/components/RoomNav'

	export default {
		components: {
			RoomNav
		}
	}

</script>

<style lang="scss" scoped>
	
</style>