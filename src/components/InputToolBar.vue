<template>
  <div class="input-toolbar">
    <!--
    <div class="input-suggestions">
      <div v-for="suggestion in inputSuggestions" class="suggestion" @click="suggestionClick(suggestion)">
          {{suggestion.text}}
      </div>
    </div>
    -->
    <form novalidate>
      <div :class="['input-box', mobile ? 'mobile' : '']">
        <form @submit.prevent="onSend" class="input-form">
          <input type="text" v-model="text" class="input-text" :placeholder="placeholder" ref="inputText" autofocus />
        </form>
      </div> 
    </form>
  </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['muteSpeaker', 'topic', 'user', 'mobile'],
    data() {
      return {
        text: '',
        inputSuggestions: [{text: 'Sign up', action: 'send'},
          {text: 'Join room', action: 'send'}, 
          {text: 'Log in', action: 'send'}, 
          {text: 'My name is ...', action: 'fill'}, 
          {text: 'I like ...', action: 'fill'}, 
          {text: 'Log out', action: 'send'}]
      }
    },

    computed: {
      ...mapGetters([
        'placeholder',
        'currentRoomChannel'
      ]),
      slide() {
        return {
          _id: Math.round(Math.random() * 1000000),
          text: this.text,
          room: this.topic, 
          user: this.user,
          author_name: this.user.name,
          edit: false,
          public: false,
          sponsored: false,
          inserted_at: new Date(),
        }
      },

      /*
      roomChannel() {
        return this.$store.state.currentRoomChannel
      }
      */
      

    },

    methods: {
      onSend() {
        this.$store.dispatch('pushSlide', {
          roomChannel: this.currentRoomChannel, 
          slide: this.slide, 
          event: 'request'})
            .then(() => {
              this.text = ''
            })
      },
      suggestionClick(suggestion) {
        this.text = suggestion.text
        if (suggestion.action === 'fill') {
          // something
        } else if (suggestion.action === 'send') {
          this.onSend()
        }  
        this.$refs.inputText.focus() 
      }
    }
  }
  
</script>

<style lang="scss" scope>
  $border-color: rgb(225, 225, 225);
  $primary-darker-color: rgb(217, 98, 12);

  .input-toolbar {
    position: fixed;
    bottom: 0px;
    z-index: 3;
  }

  .input-box {
    width: calc(100vw - 360px);
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
  }

  .input-text {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    padding: 0px 12px 0px 12px;
  }

  .input-suggestions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .suggestion {
    border: 1px solid $primary-darker-color;
    padding: 14px;
    border-radius: 20px;
    margin: 12px;
    color: $primary-darker-color;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
  }

</style>