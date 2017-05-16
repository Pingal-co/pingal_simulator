<template>
	<div>
		<div class="fb-login-button fb-custom-signup" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true" 
		data-scope="public_profile,email" onlogin="FB.checkLoginState()"></div>

		<form novalidate @submit.stop.prevent="logIn" class="login-form">
			<span class="error-message">{{error}}</span>
			<span class="success-message""">{{success}}</span>
		  <md-input-container>
		    <label>Email</label>
		    <md-input type="email" v-model="email"></md-input>
		  </md-input-container>
		  <md-input-container>
		    <label>Password</label>
		    <md-input @keyup.enter.native="logIn" type="password" v-model="password"></md-input>
		  </md-input-container>
		  <md-button class="md-raised md-primary" type="submit">Log in</md-button>
		</form>
	</div>
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
			logIn() {
				this.$store.dispatch('logIn', {
					email: this.email,
					password: this.password,
				})
				// .then(() => {
				// 	this.email = ''
				// 	this.password = ''
				// 	this.success = 'Success!'
				// 	this.error = ''
				// })
			}
		},
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

	.login-form {
		display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	}
</style>