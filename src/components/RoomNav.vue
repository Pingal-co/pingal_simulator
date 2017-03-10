<template>
	<div class="room-nav">
		<md-list class="custom-list md-double-line">
			<!-- Pingal -->
			<md-list-item>
			  <md-avatar>
			    <img src="../assets/pingal_play_icon.png" alt="Pingal" />
			  </md-avatar>

			  <div class="md-list-text-container">
			    <span>Pingal</span>
			    <p>What would you like to talk about?</p>
			  </div>

			  <md-divider class="md-inset"></md-divider>
			</md-list-item>
			<!-- Users -->
			<room-nav-slide 
				v-for="(room, index) in rooms"
				:key="index"
				:room="room"	
			/>
	  </md-list>
 	</div>
</template>

<script>
	import RoomNavSlide from '@/components/RoomNavSlide'

	export default {
		props: ['rooms'],
		components: {
			RoomNavSlide
		}
	}
</script>

<style lang="scss" scoped>
	.room-nav {
		height: calc(100vh - 54px);
		border-right: 1px solid rgba(0, 0, 0, 0.12);
	}
</style>

