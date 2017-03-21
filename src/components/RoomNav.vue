<template>
	<div class="room-nav">
		<md-list class="custom-list md-double-line room-nav-list">
			<!-- Pingal -->
			<md-list-item class="room-nav-slide pingal-nav">
			  <md-avatar>
			    <img src="../assets/pingal_play_icon.png" alt="Pingal" />
			  </md-avatar>

			  <div class="md-list-text-container">
			    <span>Pingal</span>
			    <p>What would you like to talk about?</p>
			  </div>
			</md-list-item>
			<!-- Users -->
			<room-nav-slide 
				v-for="room in rooms"
				:key="room.id"
				:room="room"	
			/>
	  </md-list>
 	</div>
</template>

<script>
	import RoomNavSlide from '@/components/RoomNavSlide'

	export default {
		components: {
			RoomNavSlide
		},
		computed: {
			rooms() {
				return this.$store.state.rooms
			}
		}
	}
</script>

<style lang="scss" scoped>
	$border-color: rgb(225, 225, 225);

	.room-nav {
		height: calc(100vh - 54px);
		border-right: 1px solid $border-color;
		min-width: 360px;
		overflow: scroll;
	}

	.room-nav-list {
		padding-top: 0px;
	}

	.pingal-nav {
		background-color: $border-color;
	}

	.room-nav-slide:hover {
		background-color: $border-color;
	}
</style>

