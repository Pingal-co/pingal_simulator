<template>
	<div>
		<span v-for="(s, i) in linkArray">
			<!-- Text -->
			<span v-if="i % 2 === 0">{{s}}</span>
			<!-- Link -->
			<span v-else><a :href="s" target="_blank">{{s}}</a></span>
		</span>
	</div>
</template>

<script>
	export default {
		props: ['text'],
		computed: {
			linkArray() {
				return this.text.split(/(https?:\/\/[^\s]+)/)
			}
		}
	}
</script>

<style>
	
</style>

