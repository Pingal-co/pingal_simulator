import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import Cookies from 'js-cookie'
import {
  joinWorldChannel, 
  joinPingalChannel
} from '@/chatserver'

Vue.use(Vuex)

// Load cookie data
let user = Cookies.get('user');
user = user ? JSON.parse(user) : null;

let jwt = Cookies.get('jwt');
jwt = jwt ? jwt : null;

let session = Cookies.get('session');

// Load current room as pings channel
let currentRoomChannel = jwt ? joinPingalChannel(user.id) : joinWorldChannel(session)

// contains the state of entire app
const state = {
  slides: [],
  currentSlide: {},
  currentUser: user,
  rooms: [],
  currentRoom: {name: "Pingal"},
  currentRoomChannel: currentRoomChannel,
  jwt: jwt,
}


/*
 Getters are like computed properties for stores.
 We can compute derived state based on store state.
 The getters will be exposed on the store.getters object
*/

const getters = {
  // slides: (state) => state.slides,
  // currentSlide: (state) => state.currentSlide,
  // getSlidesCount: (state) => state.slides.length,

  // rooms: (state) => state.rooms,
  // currentRoom: (state) => state.currentRoom,
  // getRoomsCount: (state) => state.rooms.length,

  // currentUser: (state) => state.currentUser,

}

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production', // If can work, nice to use
  state,
  getters,
  mutations,
  actions
})

export default store