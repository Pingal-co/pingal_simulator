<template>
	<div :class="['feedback-channel', selected]" @click="joinFeedbackChannel">Feedback and Ideas</div>
</template>

<script>
	export default {
		computed: {
			room() {
				return {id: 1, name: "Feedback and Ideas"}
			},
			// Styling
			selected() {
				if ("rooms:" + this.room.id == this.$store.state.currentRoomChannel.topic) {
					return 'selected'
				} else {
					return null
				}
			},
		},
		methods: {
			joinFeedbackChannel() {
				this.$store.dispatch('updateCurrentRoomChannel', {
					room: this.room
				})
				this.$store.commit('HIDE_RIGHT')
			}
		}
	}
</script>

<style lang="scss" scoped>	
	.feedback-channel {
		min-width: 359px;
		max-width: 359px;
		height: 54px;
		font-size: 16px;
		z-index: 10;
		// background-color: rgb(244, 128, 45);
		background-color: white;
		// color: white;
		border-top: 1px solid #d9620c;
		color: #d9620c;
		position: fixed;
		bottom: 0px;
		user-select: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.feedback-channel:hover {
		background-color: rgb(244, 128, 45);
		color: white;
		border-top: 1px solid rgb(244, 128, 45);
	}
	.feedback-channel:active {
		background-color: #d9620c;
	}
	.selected {
		background-color: rgb(244, 128, 45);
		color: white;
		border-top: 1px solid rgb(244, 128, 45);
	}
</style>