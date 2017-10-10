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
				    <p class="subtitle-text">What interests you?</p>
				  </div>
				</md-list-item>
			</div>
			<search-slide />
			<!-- Chats and Radars -->
<!-- 			<div v-if="introductions.length > 0" class="room-nav-header">Introductions</div>
			<room-nav-slide 
				v-for="introduction in introductions"
				:key="introduction.id"
				:room="introduction"	
			/> -->

			<div v-if="channels.length > 0" class="room-nav-header">Topic Networks</div>
			<room-nav-slide 
				v-for="channel in channels"
				:key="channel.id"
				:room="channel"	
			/>
			<div v-if="chats.length > 0" class="room-nav-header">Private Group Chats</div>
			<room-nav-slide 
				v-for="chat in chats"
				:key="chat.id"
				:room="chat"	
			/>

			<feedback-nav />
	  	</md-list>
	  	
 	</div>
</template>

<script>
	import RoomNavSlide from '@/components/RoomNavSlide'
	import FeedbackNav from '@/components/FeedbackNav'
	import SearchSlide from '@/components/SearchSlide'

	export default {
		components: {
			RoomNavSlide,
			FeedbackNav,
			SearchSlide
		},

		computed: {
			rooms() {
				return this.$store.getters.searchRooms
			},
			// introductions() {
			// 	return this.rooms.filter(room => room.type === 3)
			// },
			chats() {
				return this.rooms.filter(room => room.type === 2 || room.type === 3)
			},
			channels() {
				let ch = this.rooms.filter(room => room.type === 1)
				console.log("channels:")
				console.log(ch)
				return ch
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
				let user = this.$store.state.currentUser;
				let session = this.$store.state.session;
				let params = user ? {user: user} : {session: session};
				this.$store.dispatch('setCurrentPingalChannel', params);
				this.$store.dispatch('pingalSuggest', {roomChannel: this.currentRoomChannel});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$primary-darker-color: rgb(217, 98, 12);
	$border-color: rgb(225, 225, 225);
	$primary-color-l2: rgb(252, 224, 203);
	$secondary: rgb(78, 67, 58);
	$secondary-d2: rgb(68, 57, 48);
	$secondary-l2: rgb(88, 77, 68);

	.room-nav {
		height: calc(100vh - 54px);
		border-right: 1px solid $border-color;
		// background-color: rgb(244, 128, 45);
		background-color: $secondary;
		min-width: 320px;
		max-width: 320px;
		overflow: scroll;
		padding-bottom: 54px; // neccesary for Feedback and Ideas covering bottom item 
	}
	.room-nav-header {
		color: #d9620c;
    	font-size: 16px;
    	padding: 12px 12px 6px 15px;
		// background-color: white;
		background-color: $secondary;
	}
	.room-nav-list {
		padding-top: 0px;
		// background-color: rgb(244, 128, 45);
		background-color: $secondary !important;
	}

	.room-nav-slide {
		// color: white;
		color: rgba(165, 148, 142, 1);
		cursor: pointer;
	}

	.room-nav-slide:hover {
		// background-color: $border-color;
		background-color: $secondary-d2;
	}

	.room-nav-slide:active {
		// background-color: rgb(215, 215, 215);
		background-color: $secondary-l2;
	}

	.selected {
		// background-color: $border-color-darker;
		background-color: $primary-darker-color;
		color: white;
	}

	.selected:hover {
		background-color: $primary-darker-color;
	}

	.selected .subtitle-text {
		color: rgba(220, 220, 220, 1) !important;
	}

	.subtitle-text {
		color: rgba(165, 148, 142, 0.85) !important;
	}

	@media only screen and (max-width: 768px) {
		.room-nav {
			height: 100vh;
		}
	}
</style>

