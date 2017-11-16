<template>
	<form @submit.prevent="onSend" class="reply-form">
		<input v-model="text" type="text" class="reply-box" placeholder="Type a reply..." ref="inputText" id="reply-box" />
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		props: ['parentId'],
		data() {
			return {
				text: '',
			}
		},
		computed: {
			...mapGetters([
		        'currentRoomChannel',
		        'currentRoomInputChannel',
		        'inputChannel'
		      ]),
			slide() {
				return {
					text: this.text,
					parent_id: this.parentId,
				}
			}
		},
		methods: {
			onSend() {
				this.$store.dispatch('pushSlide', {
					roomChannel: this.inputChannel, 
					slide: this.slide, 
					event: 'add:reply'
				})
				.then(() => {
					this.text = ''
				})
			},
			focus() {
				this.$refs.inputText.focus();
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