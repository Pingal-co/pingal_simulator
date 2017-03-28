<template>
	<div class="room-menu">

		<div class="room-topics">
			<div class="room-topics-header">
				Your Topics
			</div>
			<md-chips v-model="topics" :md-max="20" md-input-placeholder="Topics...">
			  <template scope="chip">
			    <span>{{ chip.value }}</span>
			    <small v-if="chip.value === 'Amsterdam'">(favorite)</small>
			  </template>
			</md-chips>
		</div>

		<div class="room-connections">
		  <md-list>
 			<div class="room-connections-header">Your Connections</div>
		    <md-list-item>
		      <md-avatar>
		        <img src="https://placeimg.com/40/40/people/5" alt="People">
		      </md-avatar>

		      <span>Abbey Christansen</span>

		      <md-button class="md-icon-button md-list-action">
		        <md-icon class="md-primary">chat_bubble</md-icon>
		      </md-button>
		    </md-list-item>

		    <md-list-item>
		      <md-avatar>
		        <img src="https://placeimg.com/40/40/people/1" alt="People">
		      </md-avatar>

		      <span>Alex Nelson</span>

		      <md-button class="md-icon-button md-list-action">
		        <md-icon class="md-primary">chat_bubble</md-icon>
		      </md-button>
		    </md-list-item>

		    <md-list-item>
		      <md-avatar>
		        <img src="https://placeimg.com/40/40/people/6" alt="People">
		      </md-avatar>

		      <span>Mary Johnson</span>

		      <md-button class="md-icon-button md-list-action">
		        <md-icon>chat_bubble</md-icon>
		      </md-button>
		    </md-list-item>
		  </md-list>
		</div>
	</div>
</template>

<script>
	export default {
	  data: () => ({
	      topics: ['Amsterdam', 'London', 'Tokio']
	  })
	};
</script>

<style lang="scss">
	$border-color: rgb(225, 225, 225);
	$primary-darker-color: rgb(217, 98, 12);

	.room-menu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: center;	
	}

	.room-topics {
		padding: 8px 18px 0px 18px;
	}

	.room-connections {

	}

	.room-topics-header, .room-connections-header {
		color: rgba(0,0,0,.54);
    	font-size: 14px;
	}

	.room-topics-header {
		padding-top: 12px;
	}

	.room-connections-header {
		padding-top: 6px;
		padding-left: 18px;
		padding-bottom: 6px; 
	}

</style>