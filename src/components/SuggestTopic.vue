<template>
	<md-card-actions>
	  <md-button v-for="topic, index in topics" :key="index">
	  	<div @click="clickTopic(topic)">@{{topic}}</div>
	  </md-button>
	</md-card-actions>
</template>

<script>
	export default {
		props: ['topics'],
		computed: {
			roomChannel() {
				return this.$store.state.currentRoomChannel
			}
		},
		methods: {
			clickTopic(topic) {
				this.$store.dispatch('pushSlide', {
		          roomChannel: this.roomChannel,
		          slide: {text: 'Join topic @' + topic}, 
		          event: 'request'
				})
			}
		}
	}
</script>