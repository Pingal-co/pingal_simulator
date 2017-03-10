<template>
    <div class="card-custom">
        <md-list-item >
            <!-- Pingal Slide -->
            <md-card v-if="slide.user._id === 1">
              <md-card-area md-inset>
                <md-card-content>
                  <md-avatar>
                    <img src="../assets/pingal_play_icon.png" alt="Pingal">
                  </md-avatar>
                  <div class="expand-custom">
                      <div class="md-title">  {{ slide.body }}</div>                  
                      <md-card-actions>
                          <md-button v-for="channel in slide.channels" v-bind:key="channel._id" :channel="channel">{{channel.topic}}</md-button>
                      </md-card-actions>
                  </div>                   
                </md-card-content> 
              </md-card-area>

              <div> <!-- Adds line --></div> 
            </md-card>

            <!-- User Slide -->
            <md-card v-else>
<!--               <md-card-content>
                 <div class="md-subhead"> {{ slide.user.name }}, {{ datetime }}</div>
              </md-card-content> -->
<!-- 
              <md-card-expand v-if="slide.buttons">
                  <md-button class="md-icon-button" md-expand-trigger>
                      <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                  <md-card-content>
                      <md-card-actions>
                          <md-button v-for="button in slide.buttons" v-bind:key="button._id" :action="button">{{button.text}}</md-button>
                      </md-card-actions>
                  </md-card-content>
              </md-card-expand> -->

              <md-card-area md-inset>
                <md-card-content>
                  <md-avatar class="md-avatar-icon md-warn">
                      <md-icon>{{ slide.user.avatar }}</md-icon>
                  </md-avatar>
                      <div class="expand-custom">
                          <div class="md-title">  {{ slide.body }}</div>                  
                      </div>                   
                  </md-card-content> 
               </md-card-area>

               <div> <!-- Adds line --></div>    
                      
            </md-card>
        </md-list-item>
    </div>
</template>

<script>
 import moment from 'moment';
 export default {
    props: ['slide'] ,
    computed: {
        datetime: function() {
           return moment(this.slide.inserted_at).format('YYYY-MM-DD [at] hh:mm')
          // return this.slide.inserted_at
      }
    },
    methods:{
      login: function () {
        console.log('login')
      },

    }
  }
  
</script>

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


  .card-custom {
    margin-top: 8px;
    display: flex;

    .md-card {
        display: flex;
        flex-direction: column;
        border-radius: $card-radius;
        box-shadow: none;  
    }

    .md-title {
        font-size: 16px;
        font-weight: 400;
    }
    .md-button {
        border-radius: 8px;
    } 
    
    .md-card-content {
        padding: 12px;
        display: flex;
        justify-content: flex-end;

        &:last-child {
            padding-bottom: 16px;
        }
    }

    .expand-custom {
        display: flex;
        flex-direction: column;
    }

    .md-card-actions {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

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

   
 }
 

</style>