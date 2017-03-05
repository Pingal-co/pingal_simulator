<template>
  <div class="lobby">
    <top-bar
      :show-login-icon="true"
      :show-menu-icon="true"
    >
    </top-bar>
       
    <slide-list
      :slides="slides">
    </slide-list>

    <input-tool-bar
      :mute-speaker="true">
      :topic="topic"
      :user="user"
    </input-tool-bar>
    
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar'
  import SlideList from '@/components/SlideList'
  import InputToolBar from '@/components/InputToolBar'

  export default {
    name: 'hello',
    components: {
      TopBar,
      SlideList,
      InputToolBar
    },
    data () {
      return {
        slides: require('@/store/data'),
        topic: 'room:1:15',
        user: { _id: 1, name: 'Pingal', hash: 'Pingal', avatar: 'mood'}
      }
    }
  }

/*
[ 
          {
            _id: Math.round(Math.random() * 1000000),
            body: "Hey, my name's Pingal. I'm a personal superconnector.",
            user: { _id: 1, avatar: 'collections', name: 'Pingal' },
            timestamp: new Date(Date.now()),
            location: { latitude: 48.864601, longitude: 2.398704},
            channels: [{'topic': 'tea', 'topic_id': 'room:1:15'},{'topic': 'tech', 'topic_id': 'room:1:16'}],
            buttons: [{id: 1, text: 'Action 1'}, {id: 2, text: 'Action 2'}]
          }
        ]
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.lobby {
  margin-top: 1px;
}
</style>

