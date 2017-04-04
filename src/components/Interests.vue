<template>
	<md-chips v-model="interests" @change="change" :md-max="maxCount" md-input-placeholder="Add Interest...">
	  <template scope="chip">
	    <span>{{ chip.value }}</span>
	  </template>
	</md-chips>
</template>

<script>
	export default {
		props: ['interests', 'maxCount'],
		methods: {
			change() {
				this.$store.dispatch('updateInterests', {
					interests: this.interests.join(","),
					roomChannel: this.$store.state.currentRoomChannel,
				})
			}
		}
	}
</script>