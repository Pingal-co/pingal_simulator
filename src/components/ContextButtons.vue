<template>
	<md-card-actions>
	  <md-button v-for="button, index in buttons" :key="index">
	  	<div @click="clickAction(button)">{{button.text}}</div>
	  </md-button>
	</md-card-actions>
</template>

<script>
	export default {
		props: ['buttons'],
		computed: {
			roomChannel() {
				return this.$store.state.currentRoomChannel
			}
		},
		methods: {
			clickAction(button) {
				this.$store.dispatch('pushSlide', {
		          roomChannel: this.roomChannel,
		          slide: {text: button.command}, 
		          event: 'request'
				})
			}
		}
	}
</script>