<template>
	<md-card-actions>
	  <md-button v-for="topic, index in topics" :key="index">@{{topic}}</md-button>
	</md-card-actions>
</template>

<script>
	export default {
		data() {
			return {
				topics: ["MIT", "AI", "neuroscience", "salons", "meditation", "st_patricks_day_parties"]
			}
		}
	}
</script>