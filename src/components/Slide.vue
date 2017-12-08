<template>
  <!-- Pingal Slide -->
  <div class="card-custom" v-if="slide.isPingal === true || slide.user_id === 1">
    <md-list-item >
        <md-card >
          <md-card-area md-inset>
            <div class="user-name">
              Pingal
              <span class="datetime">{{datetime}}</span>
            </div>
            <md-card-content>
              <md-avatar class="pingal-avatar">
                <img src="../assets/pingal_play_icon.png" alt="Pingal">
              </md-avatar>
              <div class="expand-custom">
                  <div class="md-title">{{ slide.text }}</div> 

                  <div v-if="slide.brain && slide.brain.index_terms && slide.brain.index_terms.length > 0">
                    <!-- <search-planner></search-planner> -->
                  </div> 
                  <div v-if="slide.type === 'suggestTopic'">
                    <suggest-topics :topics="slide.topics"></suggest-topics>
                  </div> 
                  <div v-else-if="slide.type === 'signUp'">
                    <sign-up></sign-up>
                  </div>
                  <div v-else-if="slide.type === 'logIn'">
                    <log-in></log-in>
                  </div> 
                  <div v-else-if="slide.type === 'nextAction'">
                    <context-buttons :buttons="slide.buttons"></context-buttons>
                  </div>
              </div>                   
            </md-card-content> 
          </md-card-area>
        </md-card>
    </md-list-item>
  </div>

  <!-- User Slide -->
  <div v-else class="card-custom"> <!-- @click="toggleExpanded" -->
    <md-list-item>
        <md-card>
          <md-card-area md-inset>
            <div class="user-name">
              {{slide.author_name}}
              <span class="datetime">{{datetime}}</span>
            </div>

            <md-card-content>
              <avatar :name="slide.author_name" />
 
              <div class="expand-custom">
                  <div class="md-title">
                    <slide-text :text="slide.text" />
                  </div>                  
              </div>

                                 
            </md-card-content> 
<!--             <div>
              <md-button class="md-icon-button" @click.native="upvote"><md-icon class="thumb-icon">thumb_up</md-icon></md-button>           
              <md-button class="md-icon-button" @click.native="downvote"><md-icon class="thumb-icon">thumb_down</md-icon></md-button>
            </div>  -->

<!--        <div v-if="expanded" class="expanded">
              <reply-slide v-for="slide in replies" :slide="slide" :key="slide.id" />
              <reply-input :parentId="slide.id" ref="replyInput" />
            </div>  
            <div v-else class="expanded">
              <reply-slide v-for="slide in replies.slice(0, 3)" :slide="slide" :key="slide.id" />
              <div class="more">{{more}}</div>
            </div> -->
          </md-card-area>
                    
        </md-card>
    </md-list-item>
  </div>
</template>

<script>
  import SignUp from '@/components/Signup'
  import LogIn from '@/components/Login'
  import SuggestTopics from '@/components/SuggestTopics'
  import ContextButtons from '@/components/ContextButtons'
  import SearchPlanner from '@/components/SearchPlanner'
  import Avatar from '@/components/Avatar'
  import ReplyInput from '@/components/ReplyInput'
  import ReplySlide from '@/components/ReplySlide'
  import SlideText from '@/components/SlideText'

  import moment from 'moment';

  export default {
    props: ['slide'],
    data() {
      return {
        expanded: false,
      }
    },
    computed: {
      datetime() {
         return moment(this.slide.inserted_at).calendar(null, {
                    sameDay: '[Today at] h:mm a',
                    nextDay: '[Tomorrow at] h:mm a',
                    lastDay: '[Yesterday at] h:mm a',
                    nextWeek: "[Next] dddd [at] h:mm a",
                    lastWeek: '[Last] dddd [at] h:mm a',
                    sameElse: 'h:mm a [on] MMMM Do[,] YYYY'
                });
      },
      roomChannel() {
				return this.$store.state.currentRoomChannel
			}

      // replies() {
      //   return this.slide.replies ? this.slide.replies : []
      // },
      // more() {
      //   let count = this.replies.length - 3
      //   if (count > 0) {
      //     return '+ ' + count + ' replies'
      //   } else {
      //     return 'reply'
      //   }
      // }
    },
    methods: {
        upvote() {
          console.log("upvoted")
          console.log(this.roomChannel)
          let payload = {
            text: 'upvote',
          }
				this.$store.dispatch('pushSlide', {
		          roomChannel: this.roomChannel,
		          slide: payload, 
		          event: 'vote'
				})
        },
        downvote() {
          console.log("downvoted")
        }
      
      },
    // methods: {
    //   toggleExpanded(e) {
    //     // this.$refs.replyInput.focus()
    //     // console.log(this.$refs.replyInput)
    //     if (e.target.id != 'reply-box') {
    //       this.expanded = !this.expanded
    //       if (this.expanded) {
    //         this.$nextTick(function() {
    //           this.$refs.replyInput.focus()
    //         })
    //       }
    //     }
    //   }
    // },
    components: {
      SignUp,
      LogIn,
      SuggestTopics,
      ContextButtons,
      SearchPlanner,
      Avatar,
      ReplyInput,
      ReplySlide,
      SlideText
    }
  }
  
</script>

<style lang="scss">    
// unscoped material override
  .md-list-item-container {
    min-height: 70px !important;
  }
</style>

<style lang="scss" scoped>
  /* 
    Customize cards theme in vue-material 
    This is based on the vue-material code in github  
    if you want to modify anything else, 
    read the code:
        https://github.com/marcosmoura/vue-material/blob/master/src/components/mdCard/mdCard.scss
  */
  $card-radius: 8px;
  /* Elevation - Based on Angular Material */
  $shadow-key-umbra-opacity: .2 !default;
  $shadow-key-penumbra-opacity: .14 !default;
  $shadow-ambient-shadow-opacity: .12 !default;

  $material-shadow-1dp: 0 1px 3px rgba(#000, $shadow-key-umbra-opacity),
                        0 1px 1px rgba(#000, $shadow-key-penumbra-opacity),
                        0 2px 1px -1px rgba(#000, $shadow-ambient-shadow-opacity) !default;

  $primary-darker-color: rgb(217, 98, 12);
  $primary-color: rgb(244, 128, 45);
  $primary-color-l1: rgb(250, 192, 150);
  $primary-color-l2: rgb(252, 224, 203);
  $primary-color-l3: rgb(254, 243, 234);
  $primary-color-l4: rgb(254, 247, 242); 
  $primary-color-l5: rgb(255, 250, 247);

  .expanded {
    width: 100%;
    margin-left: 44px;
    padding-bottom: 16px;
  }

  .more {
    padding-left: 25px;
    color: #a0a0a0;
    font-size: 12px;
    margin-top: -9px;
  }



  .card-custom {
    padding-top: 15px;
    display: flex;
    cursor: pointer;

    .md-card {
        display: flex;
        flex-direction: column;
        border-radius: $card-radius;
        box-shadow: none;  
        background-color: transparent;
    }

    .md-title {
        font-size: 16px;
        font-weight: 400;
        overflow-wrap: break-word;
    }
    .md-button {
        border-radius: 8px;
    } 
    .md-icon-button{
      margin-right: -15px;     
    }
    
    .md-card-content {
        padding: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        &:last-child {
            padding-bottom: 16px;
        }
    }

    .thumb-icon {
      color: $primary-color;
      font-size: 20px;
      visibility: hidden;
    }

    .expand-custom {
        display: flex;
        flex-direction: column;
    }

    .pingal-avatar {
      align-self: flex-start;
    }

    .user-name {
      font-size: 12px;
      font-weight: bold;
      color: rgb(160, 160, 160);
      margin-left: 58px;
      margin-bottom: -12px;
    }
    .datetime {
      padding-left: 28px;
      visibility: hidden;
    }
    .md-card-actions {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: flex-start;

        .md-button {
            margin: 0;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }

            + .md-button {
                margin-left: 4px;
            }
        }
    }

  .signup-form {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
   
 }

 .card-custom:hover {
  background-color: $primary-color-l5;
 }

 .card-custom:active {
  background-color: $primary-color-l3;
 }

 .card-custom:hover .datetime {
  visibility: visible;
 }
 
 .card-custom:hover .thumb-icon {
  visibility: visible;
 }

</style>