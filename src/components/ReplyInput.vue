<template>
	<form @submit.prevent="onSend" class="reply-form">
		<input v-model="text" type="text" class="reply-box" placeholder="Type a response..." ref="inputText" id="reply-box" />
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		props: ['slideId'],
		data() {
			return {
				text: '',
			}
		},
		computed: {
		...mapGetters([
	        'currentRoomChannel',
	        'currentRoomInputChannel'
	      ])
		},
		methods: {
			onSend() {
				this.$store.dispatch('pushSlide', {
					roomChannel: this.currentRoomInputChannel, 
					slide: {text: this.text, response_to_slide_id: this.slideId}, 
					event: 'add:response'})
					.then(() => {
						this.text = ''
					})
			}
		}

	}
</script>

<style>
	
  .reply-box {
    width: 480px;
    font-size: 16px;
    outline: none;
    padding: 8px 12px 8px 12px;
    margin-left: 14px;
    margin-top: 6px;
  }
</style>