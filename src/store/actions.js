import uniqueId from 'uniqid'
import {
  apiURL,
  sendToChannel,
  httpGet,
  httpPost,
  httpUpdate,
  httpDelete,
  joinUserChannel,
  joinWorldChannel,
  joinRoomChannel,
  socket,
  closeSocket
} from '../chatserver'

let userChannel = null

/*
Store in Veux is immutable.

 Actions are separated from Mutations because:
  - actions are asynchronous. Multiple actions can be dispatched to the phoenix backend in async mode ;
  - whereas data mutations need to be synchronous like database transactions.
  if: the response status from phoenix is successful,
  then: commit the mutation to the store. We can log every commit if we want a debugger mode.

 This is a middleware layer. We can communicate to Phoenix using both HTTP(S) & WebSocket(ws or wss).

 store.dispatch : is an async action call
 store.commit : is a sync mutation call
*/

const actions = {

  /* START <SLIDE DISPATCH ACTION HANDLERS> */
  pushSlide ({ commit }, {roomChannel, slide, event}) {
    // channel endpoint : only push data; room.on() will receive the data
    console.log("pushed slide")
    return sendToChannel(roomChannel, slide, event)
       // .catch((error) => {
       //   error.response.json()
       //   .then((errorJSON) => {
       //      console.log('send error')
       //   })
       // })
  },

  signUp({ commit }, {email, password}) {
    console.log("signing up")
    return httpPost(`${apiURL}/users`, {user: {email: email, password: password}})
      .then(({user, jwt}) => {
        // Pingal Response
        commit('APPEND_SLIDE', {isPingal: true, text: `Welcome ${user.name}! Thanks for signing up :)`})
        // Store jwt session and user
        commit('SET_CURRENT_USER', user)
        commit('SET_CURRENT_JWT', jwt)
        // Close existing socket and re-open for authenticated user
        closeSocket()
        socket.connect({guardian_token: jwt})
        commit('SET_CURRENT_ROOM_CHANNEL', joinWorldChannel(user.id))
      })
  },
  
  /* START <USER DISPATCH ACTION HANDLERS> */
  logIn ({ commit }, {email, password}) {
    console.log("logging in")
    return httpPost(`${apiURL}/sessions`, {session: {email: email, password: password}})
      .then(({ jwt, user }) => {
          // userChannel = joinUserChannel({ id: user.id, jwt })
          commit('APPEND_SLIDE', {isPingal: true, text: `Welcome back ${user.name}!`})
          commit('SET_CURRENT_USER', user)
          commit('SET_CURRENT_JWT', jwt)
          // Close existing socket and re-open for authenticated user
          console.log("closing socket and reconnecting")
          closeSocket()
          socket.connect({guardian_token: jwt})
          commit('SET_CURRENT_ROOM_CHANNEL', joinWorldChannel(user.id))
      })
      .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
              console.log('signin error')
          })
      })
  },

  currentUser ({ commit }) {
    return httpGet(`${apiURL}/current_user`)
      .then(({ user }) => {
        const jwt = localStorage.getItem('id_token')
        userChannel = joinUserChannel({ id: user.id, jwt })
        commit('SET_CURRENT_USER', { ...user, jwt })
      })
  },

  /* START <ROOM DISPATCH ACTION HANDLERS> */
  updateCurrentRoomChannel ({commit}, {room}) {
      commit('CLEAR_SLIDES')
      commit('SET_CURRENT_ROOM_CHANNEL', joinRoomChannel(room.id))
  }

}

export default actions