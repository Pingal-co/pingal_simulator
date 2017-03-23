<template>
	<div class="topics-container">
		<div class="topics-header">
			Trending Nearby
		</div>
		<div class="topics">
		  <div v-for="topic, index in topics" :key="index">
		  	<div @click="clickTopic(topic)" class="topic">@{{topic}}</div>
		  </div>
		</div>
	</div>
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

<style lang="scss">
	$primary-darker-color: rgb(217, 98, 12);
  	$primary-color: rgb(244, 128, 45);
 	$primary-color-l1: rgb(250, 192, 150);
  	$primary-color-l2: rgb(252, 224, 203);
  	$primary-color-l3: rgb(254, 243, 234);
  	$primary-color-l4: rgb(254, 247, 242); 

  	$border-radius: 24px;

	.topics-container {
		padding-top: 18px;
		padding-bottom: 9px;
	}

	.topics-header {
		display: flex;
		justify-content: center;
		background-color: $primary-color;
		padding: 12px;
		font-size: 18px;
		color: white;
		border-top-right-radius: $border-radius;
		border-top-left-radius: $border-radius;
	}

	.topics {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 342px;
		background-color: $primary-color-l3;
		overflow-y: scroll;
		border-bottom-right-radius: $border-radius;
    	border-bottom-left-radius: $border-radius;
	}

	.topic {
		width: 100%;
		padding: 20px;
		font-size: 16px;
		cursor: pointer;
	}

	.topic:hover {
		background-color: $primary-color-l2;
	}

	.topic:active {
		background-color: $primary-color-l1;
	}

</style>