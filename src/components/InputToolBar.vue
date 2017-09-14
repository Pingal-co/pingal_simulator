 <template>
  <div class="input-toolbar">
    
    <div class="input-suggestions">
      <div v-for="(suggestion, i) in inputSuggestions" @click="suggestionClick(suggestion, i)">
          <div v-if="i === currentSuggestionIndex" class="suggestion suggestionSelected">{{suggestion.text}}</div>
          <div v-else class="suggestion">{{suggestion.text}}</div>
      </div>
    </div>
    
    <form novalidate>
      <div :class="['input-box', mobile ? 'mobile' : '']">
        <form @submit.prevent="onSend" class="input-form">
          <input type="text" v-model="text" class="input-text" :placeholder="placeholder" ref="inputText" v-on:keyup.up="upSuggestionKey" v-on:keyup.down="downSuggestionkey" autofocus />
          <span style="display:none">{{focus}}</span>
        </form>
      </div> 
    </form>
    <!-- <div v-if="text.length > 0" class="send" :click="onSend">Send</div> -->
  </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['muteSpeaker', 'topic', 'user', 'mobile'],
    data() {
      return {
        inputSuggestions: [{text: 'Sign up', action: 'send'},
          {text: 'Join room', action: 'send'}, 
          {text: 'Log in', action: 'send'}, 
          {text: 'My name is ...', action: 'fill'}, 
          {text: 'I like ...', action: 'fill'}, 
          {text: 'This is a much longer phrase than anyone wanted. So long in fact that it ran right off the end of the page.', action: 'send'}],
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
        return {
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
        this.$store.dispatch('pushSlide', {
          roomChannel: this.currentRoomInputChannel, 
          slide: this.slide, 
          event: 'request'})
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
          this.currentSuggestionIndex = -1
        }
        this.text = this.currentSuggestionIndex === -1 ? '' : this.inputSuggestions[this.currentSuggestionIndex].text
      },
      downSuggestionkey() {
        if (this.currentSuggestionIndex >= 0) {
          this.currentSuggestionIndex -= 1
        } else {
          this.currentSuggestionIndex = this.inputSuggestions.length - 1
        }
        this.text = this.currentSuggestionIndex === -1 ? '' : this.inputSuggestions[this.currentSuggestionIndex].text
      }
    },

    updated() {
      this.focusInput()
    }
  }
  
</script>

<style lang="scss" scope>
  $border-color: rgb(225, 225, 225);
  $primary-darker-color: rgb(217, 98, 12);

  .input-toolbar {
    width: 100%;
    z-index: 3;
    align-self: flex-end;
  }

  .input-box {
    height: 54px;
    border-top: 1px solid $border-color;
    display: flex;
  }

  .mobile {
    width: 100vw;
  }

  .input-form {
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .input-text {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    padding: 0px 12px 0px 12px;
  }

  .input-suggestions {
    position: relative;
    // width: 100%;
    // bottom: 54px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.16), 0px 0px 3px 1px rgba(0,0,0,0.08);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    overflow: hidden;
  }

  .suggestion {
    // border: 1px solid $primary-darker-color;
    // padding: 14px;
    // border-radius: 20px;
    // margin: 12px;
    // color: $primary-darker-color;
    // background-color: white;
    // font-size: 16px;
    width: 100%;
    cursor: pointer;
    color: black;
    font-size: 14px;
    padding: 6px;
    user-select: none;
  }

  .suggestion:hover, .suggestionSelected {
    background-color: #A6948E;
  }

</style>