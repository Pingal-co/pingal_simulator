<template>
	<div class="slides-section"> 
		<slide-list 
		  :slides="replies">
		</slide-list>

		<input-tool-bar
		  :mute-speaker="true"
		  :topic="topic"
		  :user="user"
		  :mobile="mobile"
		  :parentSlide="slide"
		  >
		</input-tool-bar>
	</div>
</template>

<script>
	import Slide from '@/components/Slide'
	import SlideList from '@/components/SlideList'
	import InputToolBar from '@/components/InputToolBar'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
			Slide,
			SlideList,
			InputToolBar
		},
		data() {
			return {
				topic: '1',
				windowWidth: window.innerWidth,
			}
		},
		computed: {
		  ...mapGetters([
	      	'getSlidesByRoom',
	      	'currentRoomChannel',
	      	'bot'
	      ]),
		  slide() {
		  	return this.$route.params.chat_id ? this.$store.state.slides.find(slide => slide.id == this.$route.params.chat_id) : null 
		  },
      replies() {
      	if (this.$route.params.chat_id == null) {
      		return this.getSlidesByRoom
      	} else {
      		let r = []
	      	r.push(this.slide)
	      	r = r.concat(this.slide.replies)

	        return this.slide ? r : []
      	}
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
	   },
		created() {
		// join Pingal
			if (this.$route.params.chat_id == null) {
				let user = this.$store.state.currentUser;
				let session = this.$store.state.session;
				let params = user ? {user: user} : {session: session};
				this.$store.dispatch('setCurrentPingalChannel', params);
				this.$store.dispatch('pingalSuggest', {roomChannel: this.currentRoomChannel});
			}
		},
		watch: {
			'$route.query.text': function (text) {
				console.log("sending entered text")
		    console.log(this.$route.query.text)
		    this.$store.dispatch('pushSlide', {
		        roomChannel: this.$store.state.currentRoomInputChannel,
		        slide: {_id: Math.round(Math.random() * 1000000),
		        		text: this.$route.query.text,
		        		bot: this.bot,
		        		inserted_at: new Date(),
		        		author_name: this.$store.state.currentUser.name,},
		        event: 'request'
		    })
			}
		},

		mounted() {
		    console.log("sending entered text")
		    console.log(this.$route.query.text)
		    this.$store.dispatch('pushSlide', {
		        roomChannel: this.$store.state.currentRoomInputChannel,
		        slide: {_id: Math.round(Math.random() * 1000000),
		        		text: this.$route.query.text,
		        		bot: this.bot,
		        		inserted_at: new Date(),
		        		author_name: this.$store.state.currentUser.name,},
		        event: 'request'
		    })
		}
	}
</script>

<style lang="scss" scoped>
	
</style>

