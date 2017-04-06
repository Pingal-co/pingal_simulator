<template>
	<div @click="joinRoom">
		<md-list-item :class="['room-nav-slide', selected]">
		  <avatar :name="room.name" />

		  <div class="md-list-text-container">
		    <span>{{room.name}}</span>
		    <p>{{subtitle}}</p>
		  </div>

		  <div class="formatted-time">{{formattedTime}}</div>

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
				console.log(this.room)
				if (!this.room.last_slide) {
					return ''
				} else {
					return moment(this.room.last_slide.updated_at).calendar(null, {
					  sameDay: 'h:mm a',
					  nextDay: '[The Future]',
					  nextWeek: "[How's your time machine work?]",
					  lastDay: '[Yesterday]',
					  lastWeek: 'dddd',
					  sameElse: 'MMMM Do'
					});
				}
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
			}
		},
		methods: {
			joinRoom() {
				this.$store.dispatch('updateCurrentRoomChannel', {
					room: this.room
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$border-color: rgb(225, 225, 225);
	$border-color-darker: rgb(215, 215, 215);

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
</style>