<template>
	<md-avatar class="custom-avatar">
		<div class="icon-name">{{ iconName }}</div>
	</md-avatar>
</template>

<script>
	export default {
		props: ['name'],
		computed: {
			iconName() {
				return this.name ? this.name[0].toUpperCase() : null
			}
		}
	}
</script>

<style>
	.custom-avatar {
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
		background-color: rgb(244, 128, 45) !important;

	}
	.icon-name {
		font-size: 26px;
		color: white;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
</style>