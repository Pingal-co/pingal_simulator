<template>
	<div class="slides-section"> 
		<slide-list 
		  :slides="slides"
		  :fbReinitialize="fbReinitialize">
		</slide-list>

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
	import SlideList from '@/components/SlideList'
  	import InputToolBar from '@/components/InputToolBar'
  	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
			SlideList,
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
		},
		methods: {
			fbReinitialize() {
		        // Remove Facebook SDK and reinitialize
		        if (typeof FB == "undefined") {
		          let FB = null
		        } else {
		          FB = null
		        }  
		        // Remove old facebook elements
		        let fb_js = document.getElementById("facebook-jssdk");
		        let fb_root = document.getElementById("fb-root");
		        fb_js.remove(fb_js.selectedIndex);
		        fb_root.remove(fb_root.selectedIndex)
		        // Re-append Facebook elements to ready for script re-init
		        let new_fb_root = document.createElement("div")
		        new_fb_root.id = "fb-root"
		        let body = document.getElementsByTagName('body')[0]
		        body.insertBefore(new_fb_root, body.firstChild);

		        let store = this.$store
		        window.fbAsyncInit = function() {
		          FB.init({
		            appId      : '450878908577944',
		            cookie     : true,
		            xfbml      : true,
		            version    : 'v2.8'
		          });
		          FB.AppEvents.logPageView(); 
		          
		          FB.checkLoginState = function() {
		            FB.getLoginStatus(function(response) {
		                if (response.status === 'connected') {
		                  // Log in or Sign Up
		                  let authResponse = response.authResponse
		                  FB.api(
		                    '/me',
		                    'GET',
		                    {"fields":"id,name,email,age_range,picture,gender"},
		                    function(response) {
		                      response.accessToken = authResponse.accessToken
		                      store.dispatch('fbConnect', response)
		                    }
		                  );
		                } else {
		                  // The person is not logged into this app or we are unable to tell. 
		                }
		            });
		          }  
		        };

		        (function(d, s, id){
		           var js, fjs = d.getElementsByTagName(s)[0];
		           if (d.getElementById(id)) {return;}
		           js = d.createElement(s); js.id = id;
		           js.src = "//connect.facebook.net/en_US/sdk.js";
		           fjs.parentNode.insertBefore(js, fjs);
		         }(document, 'script', 'facebook-jssdk'));
		      },
		}
	}
</script>

<style lang="scss" scoped>
	
</style>