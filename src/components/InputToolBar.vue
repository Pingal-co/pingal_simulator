<template>
    <div>
        <form novalidate>
          <div class="input-toolbar">
<!--             <md-input-container>            
                <label>Talk to PingAl</label>
                <md-textarea
                  v-model="text"
                ></md-textarea>
                <md-button
                  type="submit" 
                  class="md-primary"
                  @click.prevent = "onSend()"
                  >Send
                </md-button>
               
            </md-input-container> -->
            <form @submit.prevent="onSend" class="input-form">
              <input type="text" v-model="text" class="input-box" placeholder="Type a message..." autofocus />
            </form>
          </div> 
        </form>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['muteSpeaker', 'room', 'topic', 'user'],
    data: function() {
      return {
        text: '',
      }
    },

    computed: {
      slide() {
        return {
          _id: Math.round(Math.random() * 1000000),
          text: this.text,
          room: this.topic, 
          user: this.user,
          edit: false,
          public: false,
          sponsored: false,
          inserted_at: new Date(),
        }
      }
    },

    methods: {
      onSend() {
        console.log(this.slide);
        this.$store.dispatch('pushSlide', {
          room: this.room, 
          slide: this.slide, 
          event: 'request'})
            .then(() => {
              this.text = ''
            })
      },
    }
  }
  
</script>

<style lang="scss" scope>
  $border-color: rgb(225, 225, 225);

  .input-toolbar{
    width: calc(100vw - 360px);
    position: fixed;
    bottom: 0px;
    height: 54px;
    border-top: 1px solid $border-color;
    display: flex;
    z-index: 2;
  }

  .input-form {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .input-box {
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    padding: 0px 12px 0px 12px;
  }
</style>