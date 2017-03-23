<template>
	<div class="buttons">
	  <div v-for="button, index in buttons" :key="index">
	  	<div @click="clickAction(button)" class="button noselect">{{button.text}}</div>
	  </div>
	</div>
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

<style lang="scss">
  $primary-darker-color: rgb(217, 98, 12);
  $primary-color: rgb(244, 128, 45);

  .buttons {
  	display: flex;
  	flex-wrap: wrap;
  	justify-content: center;
  	padding-top: 9px;
  }

  .button {
    border: 1px solid $primary-darker-color;
    padding: 14px;
    border-radius: 20px;
    margin: 12px;
    color: $primary-darker-color;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
  }

  .button:hover {
  	border: 1px solid transparent;
  	color: white;
  	background-color: $primary-color;
  }

  .button:active {
  	background-color: $primary-darker-color;
  }

  .noselect {
	  -webkit-touch-callout: none; /* iOS Safari */
	    -webkit-user-select: none; /* Safari */
	     -khtml-user-select: none; /* Konqueror HTML */
	       -moz-user-select: none; /* Firefox */
	        -ms-user-select: none; /* Internet Explorer/Edge */
	            user-select: none; /* Non-prefixed version, currently
	                                  supported by Chrome and Opera */
	}
</style>