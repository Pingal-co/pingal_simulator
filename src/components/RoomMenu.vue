<template>
	<div v-if="currentRoom.type == 'pingal'" class="room-menu">pingal</div>
	<!-- Personal/Private Group -->
	<div v-else-if="currentRoom.type == 2" class="room-menu">
		<div class="add-people">
			
		</div>
		<div class="room-connections">
		  <div class="room-connections-header pt">Connections ({{users.length}})</div>
		  <md-list class="connection-panel-list">
		    <md-list-item class="connection-panel" v-for="user, index in users" :key="index" @click.native="toggleUser(index)">
		      <div class="user-panel-content">
			      <avatar :name="user.name" />

			      <span>{{user.name}}</span>
			  </div>

		      <div v-if="user.expanded" class="user-expanded">
		      	<md-button @click.native="getIntroduced(user.id)" class="md-raised md-primary get-introduced">
		      	  Message
			      <md-icon class="get-introduced-icon">chat_bubble</md-icon>
			    </md-button>
		      	  
		      	<md-button @click.native="unwatch(user.id)" :ref="'unwatch' + user.id">
		      	  Remove
		      	</md-button>
		      </div>
		    </md-list-item>
		  </md-list>
		</div>
	</div>
	<!-- Default to public room -->
	<div v-else class="room-menu">
		<div class="room-interests">
			<div class="room-interests-header">
				Interests
			</div>
			
			<interests 
				:interests="interests" 
				:maxCount="25" 
			/>
		</div>

		<div class="room-connections">
		  <div class="room-connections-header">Connections ({{users.length}})</div>
		  <md-list class="connection-panel-list">
		    <md-list-item class="connection-panel" v-for="user, index in users" :key="index" @click.native="toggleUser(index)">
		      <div class="user-panel-content">
			      <avatar :name="user.name" />

			      <span>{{user.name}}</span>

			      <md-checkbox id="my-test1" name="my-test1" v-model="user.selected" class="md-primary checkbox">
			      </md-checkbox>
			  </div>

		      <div v-if="user.expanded" class="user-expanded">
		      	<md-button @click.native="getIntroduced(user.id)" class="md-raised md-primary get-introduced">
		      	  Get Introduced
			      <md-icon class="get-introduced-icon">chat_bubble</md-icon>
			    </md-button>
		      	  
		      	<md-button @click.native="unwatch(user.id)" :ref="'unwatch' + user.id">
		      	  Unwatch
		      	</md-button>
		      </div>
		    </md-list-item>
		  </md-list>
		</div>

		<md-button @click.native="createGroupRoom" class="md-raised md-primary create-room">
			Invite to Private Group Chat
		</md-button>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Interests from '@/components/Interests'
	import Avatar from '@/components/Avatar'

	export default {
	  data: () => ({
	      checkbox: '',
	  }),
	  components: {
	  	Interests,
	  	Avatar
	  },
	  computed: {
		...mapGetters([
			'currentRoomChannel',
			'currentRoomInputChannel'
		]),
	  	invitations() {
	  		let invitees = []
	  		for (var i = 0; i < this.users.length; i++) {
	  			invitees.push(this.users[i].name)
	  		}
	  		return invitees
	  	},
	  	users() {
			console.log("users")
			console.log(this.$store.state.connections)
			console.log(this.$store.state.currentUser)
	  		return this.$store.state.connections
	  	},
	  	currentRoom() {
	  		return this.$store.state.currentRoom
	  	},
	  	interests() {
	  		let interests = this.currentRoom.nearby_index
	  		return interests ? interests.split(",").slice(0, 20) : null
	  	},
	  },
	  methods: {
	  	toggleUser(index) {
	  		// let newUser = Object.assign({}, this.users[index], {expanded: true});
	  		// this.$set(users, index, newUser);
	  		for (var i = 0; i < this.users.length; i++) {
	  			if (this.users[i].expanded) {
		  			if (i !== index) {
	  					this.users[i].expanded = false
	  				}
	  			}
	  		}
	  		this.users[index].expanded = !this.users[index].expanded
	  		this.$forceUpdate();
	  	},
	  	createGroupRoom() {
	  		let users = this.users.filter(user => user.selected);
	  		if (users.length < 2) {
	  			alert('Select at least two people to invite.')
	  		} else {
		  		this.$store.dispatch('createGroupRoom', {
		  			users: users,
		  			roomChannel: this.currentRoomChannel
		  		})
	  		}
	  	},
	  	getIntroduced(userId) {
	  		console.log("get Introduced")
	  		this.$store.dispatch("getIntroduced", {
	  			userId: userId,
	  			roomChannel: this.currentRoomChannel
	  		})
	  	},
	  	unwatch(userId) {
	  		this.$store.dispatch("unwatch", {
	  			currentRoom: this.currentRoom,
	  			userId: userId
	  		})
	  	}
	  },
		// beforeMount() {
		// 	for (var i = 0; i < this.users.length; i++) {
		// 		this.$set(users[i], 'expanded', false)
		// 	}
		// }
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
		max-height: calc(50vh - 54px);
		overflow-y: scroll;
	}
	.room-connections {
	}
	.connection-panel {
		cursor: pointer;
	}
	.connection-panel .md-list-item-container {
		display: flex !important;
		flex-direction: column !important;
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
	.pt {
		padding-top: 20px;
	}
	.checkbox {
		z-index: 8;
	}
	.user-panel-content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.user-expanded {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.get-introduced {
	}
	.get-introduced-icon {
		color: white !important;
		padding-left: 5px;
	}
	.create-room {
		margin-top: 16px !important;
	}
</style>