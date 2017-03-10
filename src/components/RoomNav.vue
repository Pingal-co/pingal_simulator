<template>
	<div class="room-nav">
		<md-list class="custom-list md-double-line">
			<md-list-item>
	      <md-avatar>
	        <img src="../assets/pingal_play_icon.png" alt="Pingal">
	      </md-avatar>

	      <div class="md-list-text-container">
	        <span>Pingal</span>
	        <p>What would you like to talk about?</p>
	      </div>

	      <p>12:01pm</p>

	      <md-divider class="md-inset"></md-divider>
	    </md-list-item>

			<md-list-item v-for="room in rooms">
	      <md-avatar>
	        <img :src="room.image">
	      </md-avatar>

	      <div class="md-list-text-container">
	        <span>{{room.name}}</span>
	        <p>What would you like to talk about?</p>
	      </div>

	      <p>{{room.updated_at.getHours() + ":" + room.updated_at.getMinutes()}}</p>

	      <md-divider class="md-inset"></md-divider>
	    </md-list-item>
	  </md-list>
 	</div>
</template>

<script>
	export default {
		props: ['rooms'],
	}
</script>

<style lang="scss" scoped>
	.room-nav {
		height: calc(100vh - 54px);
		border-right: 1px solid rgba(0, 0, 0, 0.12);
	}
</style>

