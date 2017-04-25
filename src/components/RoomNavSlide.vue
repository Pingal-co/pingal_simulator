<template>
	<div @click="joinRoom">
		<md-list-item :class="['room-nav-slide', selected, intro]">
		  <avatar :name="room.name" />

		  <div :class="['md-list-text-container', notification]">
		    <span>{{room.name}}</span>
		    <p>{{subtitle}}</p>
		  </div>

		  <div v-if="room.type === 3">expires in {{timeRemaining}} hours</div>
		  <div v-else :class="'formatted-time ' + notification">{{formattedTime}}</div>

		  <!-- <md-divider class="md-inset"></md-divider> -->
		</md-list-item>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import moment from 'moment'
	import Avatar from '@/components/Avatar'

	export default {
		props: ['room'],
		components: {
			Avatar
		},
		computed: {
			formattedTime() {
				if (!this.room.last_slide) {
					return ''
				} else {
					return moment(this.room.last_slide.updated_at).calendar(null, {
					  sameDay: '[Today at] h:mm a',
					  lastDay: '[Yesterday at] h:mm a',
					  nextDay: '[Tomorrow at] h:mm a',
					  nextWeek: "[Next] dddd [at] h:mm a",
					  lastWeek: '[Last] dddd [at] h:mm a',
					  sameElse: 'h:mm a [on] MMMM Do[,] YYYY'
					});
				}
			},
			timeRemaining() {
				return 48
			},
			subtitle() {
				let slide = this.room.last_slide
				if (!slide) {
					return ''
				} else if (slide.text && slide.author_name) {
					return slide.author_name + ": " + slide.text
				} else if (slide.text) {
					return slide.text
				} else {
					return "Say hello to someone new :)"
				}
				
			},
			// Styling
			selected() {
				if ("rooms:" + this.room.id == this.$store.state.currentRoomChannel.topic) {
					return 'selected'
				} else {
					return null
				}
			},
			notification() {
				let notifications = this.room.user_active_notifications ? this.room.user_active_notifications : []
				return notifications.length > 0 ? 'notification' : null
			},
			intro() {
				return this.room.type === 3 ? 'intro' : null
			}
		},
		methods: {
			joinRoom() {
				this.$store.dispatch('updateCurrentRoomChannel', {
					room: this.room
				}),
				this.$store.dispatch('denotify', {
					room: this.room,
					userChannel: this.$store.state.userChannel,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$border-color: rgb(225, 225, 225);
	$border-color-darker: rgb(215, 215, 215);

	$primary-darker-color: rgb(217, 98, 12);
  	$primary-color: rgb(244, 128, 45);
 	$primary-color-l1: rgb(250, 192, 150);
  	$primary-color-l2: rgb(252, 224, 203);
  	$primary-color-l3: rgb(254, 243, 234);
  	$primary-color-l4: rgb(254, 247, 242); 

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
		background-color: $border-color-darker;
	}

	.formatted-time {
		font-size: 12px;
		min-width: 56px;
		padding-left: 12px;
		color: rgb(151, 151, 151);
	}

	.notification {
		font-weight: bold;
	}

	.intro {
		background-color: $primary-color-l2;
	}
	.intro:hover {
		background-color: $primary-color-l1;
	}


</style>