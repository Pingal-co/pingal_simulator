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
			responseSlide() {
				return {
		          _id: Math.round(Math.random() * 1000000),
		          text: "Join topic ",
		          room: this.room, 
		          user: this.user,
		        }
			},
			room() {
				return this.$store.state.currentRoom
			}
		},
		methods: {
			clickTopic(topic) {
				this.$store.dispatch('pushSlide', {
		          room: this.room,
		          slide: {text: 'Join topic @' + topic}, 
		          event: 'request'
				})
			}
		}
	}
</script>