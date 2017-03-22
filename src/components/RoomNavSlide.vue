<template>
	<div @click="joinRoom">
		<md-list-item :class="['room-nav-slide', selected]">
		  <md-avatar>
		    <img :src="room.image" alt="room.name" />
		  </md-avatar>

		  <div class="md-list-text-container">
		    <span>{{room.name}}</span>
		    <p>{{room.subtitle}}</p>
		  </div>

		  <div class="formatted-time">{{formattedTime}}</div>

		  <!-- <md-divider class="md-inset"></md-divider> -->
		</md-list-item>
	</div>
</template>

<script>
	export default {
		props: ['room'],
		computed: {
			formattedTime() {
				return formatAMPM(this.room.updated_at)
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

	function formatAMPM(date) {
	  date = new Date(date)
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ampm;
	  return strTime;
	}
</script>

<style lang="scss" scoped>
	$border-color: rgb(225, 225, 225);

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

	.formatted-time {
		font-size: 12px;
		min-width: 56px;
		padding-left: 12px;
		color: rgb(151, 151, 151);
	}
</style>