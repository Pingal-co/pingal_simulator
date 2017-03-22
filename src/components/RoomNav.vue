<template>
	<div class="room-nav">
		<md-list class="custom-list md-double-line room-nav-list">
			<!-- Pingal -->
			<div @click="joinPingal">
				<md-list-item :class="['room-nav-slide', selected]">
				  <md-avatar>
				    <img src="../assets/pingal_play_icon.png" alt="Pingal" />
				  </md-avatar>

				  <div class="md-list-text-container">
				    <span>Pingal</span>
				    <p>What would you like to talk about?</p>
				  </div>
				</md-list-item>
			</div>
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
			},
			currentRoomChannel() {
				return this.$store.state.currentRoomChannel
			},
			selected() {
				if (this.currentRoomChannel.topic.slice(0, 5) == 'pings') {
					return 'selected'
				} else {
					return null
				}
			}
		},

		methods: {
			joinPingal() {
				let user = this.$store.state.user;
				let session = this.$store.state.session;
				let params = user ? {user: user} : {session: session};
				this.$store.dispatch('setCurrentPingalChannel', params);
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

	.room-nav-slide {
		cursor: pointer;
	}

	.room-nav-slide:hover {
		background-color: $border-color;
	}

	.room-nav-slide:active {
		background-color: rgb(215, 215, 215);
	}

	.selected {
		background-color: $border-color;
	}

	@media only screen and (max-width: 768px) {
		.room-nav {
			height: 100vh;
		}
	}
</style>

