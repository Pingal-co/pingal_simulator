<template>
	<div class="room-menu">
		<div class="room-interests">
			<div class="room-interests-header">
				Interests
			</div>
			<md-chips v-model="interests" :md-max="20" md-input-placeholder="Add Interest...">
			  <template scope="chip">
			    <span>{{ chip.value }}</span>
			  </template>
			</md-chips>
		</div>

		<div class="room-connections">
		  <div class="room-connections-header">Connections</div>
		  <md-list class="connection-panel-list">
		    <md-list-item class="connection-panel" v-for="user, index in users" :key="index">
		      <md-avatar>
		        <img :src="user.image" alt="People">
		      </md-avatar>

		      <span>{{user.name}}</span>

		      <md-button class="md-icon-button md-list-action">
		        <md-icon class="md-primary">chat_bubble</md-icon>
		      </md-button>
		    </md-list-item>
		  </md-list>
		</div>

		<md-button class="md-raised md-primary">Create Group Chat</md-button>
	</div>
</template>

<script>
	import users from '@/store/room_users_data'
	import interests from '@/store/room_interests_data.js'

	export default {
	  data: () => ({
	      interests: interests,
	      users: users,
	  }),
	  computed: {
	  	invitations() {
	  		let invitees = []
	  		for (var i = 0; i < users.length; i++) {
	  			invitees.push(users[i].name)
	  		}
	  		return invitees
	  	}
	  }
	};
</script>

<style lang="scss">
	$border-color: rgb(225, 225, 225);
	$border-color-darker: rgb(215, 215, 215);
	$primary-darker-color: rgb(217, 98, 12);

	.room-menu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: center;	
	}

	.room-interests {
		padding: 8px 18px 0px 18px;
	}

	.connection-panel-list {
		max-height: calc(40vh - 54px);
		overflow-y: scroll;
	}

	.room-connections {
	}

	.connection-panel {
		cursor: pointer;
	}

	.connection-panel:hover {
		background-color: $border-color;
	}

	.connection-panel:active {
		background-color: $border-color-darker;
	}

	.room-interests-header, .room-connections-header {
		color: rgba(0,0,0,.54);
    	font-size: 14px;
	}

	.room-interests-header {
		padding-top: 12px;
	}

	.room-connections-header {
		padding-top: 6px;
		padding-left: 18px;
		padding-bottom: 6px; 
	}

</style>