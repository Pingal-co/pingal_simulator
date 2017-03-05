<template>
    <div>
        <form novalidate>
          <div class="input-toolbar">
            <md-input-container>            
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
               
            </md-input-container>
            </div> 
        </form>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['muteSpeaker', 'topic', 'user'],
    data: function(){
      return {
        text: '',
        slide: {
          _id: Math.round(Math.random() * 1000000),
          body: this.text,
          room: this.topic, 
          user: this.user,
          inserted_at: new Date(),
        }
      }
    },

    methods:{
      onSend() {
        this.$store.dispatch('pushSlides', this.topic, this.slide, 'add:slide')
          .then(() => {
            this.text = ''
          })
      },
    }
  }
  
</script>

<style>
  .input-toolbar{
    padding: 10px;
    margin-left:10px;
  }
</style>