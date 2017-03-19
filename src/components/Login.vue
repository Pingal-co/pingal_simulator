<template>
	<form novalidate @submit.stop.prevent="login" class="login-form">
		<span class="error-message">{{error}}</span>
		<span class="success-message""">{{success}}</span>
	  <md-input-container>
	    <label>Email</label>
	    <md-input type="email" v-model="email"></md-input>
	  </md-input-container>
	    <md-input-container>
	    <label>Password</label>
	    <md-input type="password" v-model="password"></md-input>
	  </md-input-container>
	  <md-button class="md-raised md-primary" type="submit">Log in</md-button>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				error: '',
				success: ''
			}
		},
		methods: {
			login() {
				this.$store.dispatch('logIn', {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					this.email = ''
					this.password = ''
					this.success = 'Success!'
					this.error = ''
				})
			}
		}
	}
</script>

<style lang="scss" scope>
	.error-message {
		color: red;
		padding-top: 20px
	}

	.success-message {
		color: green;
		padding-top: 20px
	}
</style>