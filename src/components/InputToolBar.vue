 <template>
  <div class="input-toolbar">
    
    <div v-if="currentSuggestionIndex !== -2" class="input-suggestions">
      <div v-for="(suggestion, i) in inputSuggestions" @click="suggestionClick(suggestion, i)">
          <div v-if="i === currentSuggestionIndex" class="suggestion suggestion-selected">{{suggestion.text}}</div>
          <div v-else class="suggestion">{{suggestion.text}}</div>
      </div>
      <div v-if="currentSuggestionIndex !== -2" class="close-suggestions" @click="currentSuggestionIndex = -2">
        <div class="arrow arrow-down">↓</div>
      </div>
    </div>
    
    <div :class="['input-box', mobile ? 'mobile' : '']">
      <form @submit.prevent="onSend" class="input-form">
        <input type="text" v-model="text" class="input-text" :placeholder="placeholder" ref="inputText" v-on:keyup.up="upSuggestionKey" v-on:keyup.down="downSuggestionkey" autofocus />
        <span style="display:none">{{focus}}</span>
      </form>
      <div class="arrow-container">
        <div v-if="currentSuggestionIndex === -2" class="open-suggestions" @click="currentSuggestionIndex = -1">
          <div class="arrow arrow-up">↑</div>
        </div>
      </div>
    </div> 
    <!-- <div v-if="text.length > 0" class="send" :click="onSend">Send</div> -->
  </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['muteSpeaker', 'topic', 'user', 'mobile', 'parentSlide'],
    data() {
      return {
        inputSuggestions: [{text: 'Yep, can you share your location with me, please?', action: 'fill'},
        {text: 'Yep, can you please put in where you want to be picked up :rideshare', action: 'fill'},
        {text: ':rideshare', action: 'fill'},
        {text: ':open_lyft', action: 'fill'},
        {text: ':pick_me_up', action: 'fill'}],
        // [{text: 'Sign up', action: 'send'},
        //   {text: 'Join room', action: 'send'}, 
        //   {text: 'Log in', action: 'send'}, 
        //   {text: 'My name is ...', action: 'fill'}, 
        //   {text: 'I like ...', action: 'fill'}, 
        //   {text: 'This is a much longer phrase than anyone wanted. So long in fact that it ran right off the end of the page.', action: 'send'}],
        currentSuggestionIndex: -1,
      }
    },

    computed: {
      ...mapGetters([
        'placeholder',
        'currentRoomChannel',
        'currentRoomInputChannel',
        'bot'
      ]),
      slide() {
        let new_slide = {
          _id: Math.round(Math.random() * 1000000),
          text: this.text,
          bot: this.bot,
         //  room: this.topic, 
         // user: this.user,
         author_name: this.user.name,
         // edit: false,
         // public: false,
         // sponsored: false,
          inserted_at: new Date()
        }
        if (this.parentSlide) {
          new_slide['parent_id'] = this.parentSlide.id
        }
        return new_slide
      },

      text: {
        get() {
          return this.$store.state.currentInput.text
        },
        set(value) {
          this.$store.commit('UPDATE_INPUT_TEXT', value)
        }   
      },

      focus() {
        return this.$store.state.currentInput.focus  
      },
    },

    methods: {
      onSend() {
        console.log("sending slide")
        let event = this.parentSlide ? 'add:reply' : 'request'
        this.$store.dispatch('pushSlide', {
            roomChannel: this.currentRoomInputChannel, 
            slide: this.slide, 
            event: event
        })
        .then(() => {
          this.$store.commit('UPDATE_INPUT_TEXT', '')
        })

        // this.$store.commit('SET_BOT', "dialog")
      },
      focusInput() {
        if (this.focus > 0) {
          this.$refs.inputText.focus() 
        }
      },
      suggestionClick(suggestion, i) {
        this.text = suggestion.text
        this.currentSuggestionIndex = i;
        // if (suggestion.action === 'fill') {
        //   // something
        // } else if (suggestion.action === 'send') {
        //   this.onSend()
        // }  
        this.$refs.inputText.focus() 
      },
      upSuggestionKey() {
        if (this.currentSuggestionIndex < this.inputSuggestions.length - 1) {
          this.currentSuggestionIndex += 1
        } else {
          this.currentSuggestionIndex = -2
        }
        this.text = this.currentSuggestionIndex < 0 ? '' : this.inputSuggestions[this.currentSuggestionIndex].text
      },
      downSuggestionkey() {
        if (this.currentSuggestionIndex >= -1) {
          this.currentSuggestionIndex -= 1
        } else {
          this.currentSuggestionIndex = this.inputSuggestions.length - 1
        }
        this.text = this.currentSuggestionIndex < 0 ? '' : this.inputSuggestions[this.currentSuggestionIndex].text
      }
    },

    updated() {
      this.focusInput()
    }
  }
  
</script>

<style lang="scss" scoped>
  $border-color: rgb(225, 225, 225);
  $primary-darker-color: rgb(217, 98, 12);

  .input-toolbar {
    width: 100%;
    z-index: 3;
    align-self: flex-end;

    .input-suggestions {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      justify-content: center;
      background-color: white;
      box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.16), 0px 0px 3px 1px rgba(0,0,0,0.08);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      overflow: hidden;

        .suggestion {
          width: 100%;
          cursor: pointer;
          color: black;
          font-size: 16px;
          font-family: system-ui;
          letter-spacing: normal;
          padding: 9px 10px 9px 12px;
          user-select: none;
        }

        .suggestion:hover, .suggestion-selected {
          background-color: #E0E0E0;
        }

        .close-suggestions {
          align-self: flex-end;
          top: 6px;
          position: absolute;
        }
    }

    .input-box {
      height: 54px;
      border-top: 1px solid $border-color;
      display: flex;

      .input-form {
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 2;

        .input-text {
          width: 100%;
          font-size: 16px;
          border: none;
          outline: none;
          padding: 0px 12px 0px 12px;
        }
      }

      .arrow-container {
        z-index: 2;
        height: 54px;
        display: flex;
        background-color: white;
      }
    }

    .open-suggestions, .close-suggestions {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-self: center;
      width: 35px;
      height: 35px;
      border-radius: 30px;
      cursor: pointer;
    }

    .arrow {
      font-size: 27px;
      color: rgb(244, 128, 45);
      font-family: 'Lato', Helvetica, Arial, sans-serif;
      user-select: none;
    }

    .arrow-up {
      padding-top: 2px;
    }

    .arrow-down {

    }

    .mobile {
      width: 100vw;
    }
  }

</style>