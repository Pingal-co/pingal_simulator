<template>
	<div class="slides-section"> 
		<room-list 
		  :slides="slides">
		</room-list>

		<input-tool-bar
		  :mute-speaker="true"
		  :topic="topic"
		  :user="user"
		  :mobile="mobile"
		  >
		</input-tool-bar>
	</div>
</template>

<script>
	// import SlideList from '@/components/SlideList'
	import RoomList from '@/components/RoomList'
  	import InputToolBar from '@/components/InputToolBar'
  	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
			// SlideList,
			RoomList,
			InputToolBar
		},
		data () {
	      return {
	        topic: '1',
	        windowWidth: window.innerWidth,
	      }
	    },
		computed: {
		  ...mapGetters([
	             'getSlidesByRoom'
	        ]),
	      slides() {
	        /*
	        let sld = this.$store.state.slides
	        console.log("roomChannel")
	        console.log(this.roomChannel)
	        console.log(sld)
	        sld = sld.filter(slide => (slide.to_room_id === this.roomChannel.topic) || (`rooms:${slide.room_id}` === this.roomChannel.topic))
	        */
	        //let sld = this.getSlidesByRoom
	        //console.log("data slides:")
	        //console.log(sld)
	        return this.getSlidesByRoom
	      },
	      user() {
	        let user = this.$store.state.currentUser
	        return user ? user : { _id: 2, name: 'Anonymous', hash: 'Anonymous', avatar: 'mood'}
	      },
	      mobile() {
	        if (this.windowWidth < 768) {
	          return true
	        } else {
	          return false
	        }
	      },
		}
	}
</script>

<style lang="scss" scoped>
	
</style>