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
			onSend(button){
				this.$store.dispatch('pushSlide', {
		          roomChannel: this.roomChannel,
		          slide: {text: button.bot}, 
		          event: 'request'
				})

			},
			clickAction(button) {
				if (button.action === 'fill') {
					 this.$store.dispatch('updateInputText', {
						 text: button.text
					 })
					// dispatch an action
				} else if (button.action === 'send') {
					this.onSend(button)
				} 

			}
		}
	}
</script>