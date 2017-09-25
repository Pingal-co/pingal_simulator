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
		  slide() {
		  	return this.$store.state.slides.find(slide => slide.id == this.$route.params.room_id)
		  },
	      replies() {
	      	let r = []
	      	r.push(this.slide)
	      	r = r.concat(this.slide.replies)

	        return this.slide ? r : []
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

