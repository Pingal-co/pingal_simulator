<template>
	<md-card-actions>
	  <md-button v-for="topic, index in topics" :key="index">@{{topic}}</md-button>
	</md-card-actions>
</template>

<script>
	export default {
		props: ['topics']
	}
</script>