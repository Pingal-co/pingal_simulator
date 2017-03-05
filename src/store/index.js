import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

// contains the state of entire app
const state = {
  slides: [],
  currentSlide: {},
  currentUser: {},
  rooms: [],
  currentRoom: {},
}


/*
 Getters are like computed properties for stores.
 We can compute derived state based on store state.
 The getters will be exposed on the store.getters object
*/

const getters = {
  slides: (state) => state.slides,
  currentSlide: (state) => state.currentSlide,
  getSlidesCount: (state) => state.slides.length,

  rooms: (state) => state.rooms,
  currentRoom: (state) => state.currentRoom,
  getRoomsCount: (state) => state.rooms.length,

  currentUser: (state) => state.currentUser,

}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store