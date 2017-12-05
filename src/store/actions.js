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
  joinPingalChannel,
  joinRoomChannel,
  joinRoomInputChannel,
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
        startSession({commit}, {user: user, jwt: jwt, intro: `Welcome ${user.name}! Thanks for signing up :)`})
      })
  },

  signUpEmail({ commit }, {fullName, email}) {
    console.log("signing up by name & email")
    return httpPost(`${apiURL}/users`, {user: {fullName: fullName, email: email}})
      .then(({user, jwt}) => {
        startSession({commit}, {user: user, jwt: jwt, intro: `Welcome ${user.name}! Thanks for signing up :)`})
      })
  },
  
  /* START <USER DISPATCH ACTION HANDLERS> */
  logIn ({ commit }, {email, password}) {
    console.log("logging in")
    return httpPost(`${apiURL}/sessions`, {session: {email: email, password: password}})
      .then(({ jwt, user }) => {
          // userChannel = joinUserChannel({ id: user.id, jwt })
          startSession({commit}, {user: user, jwt: jwt, intro: `Welcome back ${user.name}!`})
      })
      .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
              console.log('signin error')
          })
      })
  },

  logInEmail ({ commit }, {email}) {
    console.log("logging in via email magic link")
    return httpPost(`${apiURL}/sessions/send_login_email`, {email: email})
      .then((response) => {
        console.log("sent login")
      })
  },

  fbConnect ({ commit }, {name, email, accessToken} ) {
    console.log("fb connect")
    return httpPost(`${apiURL}/users/fbconnect`, {name: name, email: email, accessToken: accessToken})
      .then(({jwt, user}) => {
        console.log("success fbconnect")
        startSession({commit}, {user: user, jwt: jwt, intro: `Hey there ${user.name} :)`})
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

  pingalSuggest ({commit}, {roomChannel}) {
    // send "suggest"
    return sendToChannel(roomChannel, {bot: "suggest"}, 'request')
  },

  setCurrentPingalChannel({commit}, {user, session}) {
    //commit('CLEAR_SLIDES')
    
    if (user) {
      let ch = joinPingalChannel(user.id)
      commit('SET_CURRENT_ROOM_CHANNEL', ch )
      commit('SET_CURRENT_ROOM_INPUT_CHANNEL', ch)
    } else { 
      let ch = joinWorldChannel(session) 
      commit('SET_CURRENT_ROOM_CHANNEL', ch)
      commit('SET_CURRENT_ROOM_INPUT_CHANNEL', ch)
    }

    commit('SET_CURRENT_ROOM', {name: 'Pingal'})
    commit('HIDE_RIGHT')
    
    // Focus input
    commit('INPUT_FOCUS')
  },

  /* START <ROOM DISPATCH ACTION HANDLERS> */
  updateCurrentRoomChannel ({commit}, {room}) {
      //commit('CLEAR_SLIDES')
      commit('SET_CURRENT_ROOM_CHANNEL', joinRoomChannel(room.id))
      commit('SET_CURRENT_ROOM_INPUT_CHANNEL', joinRoomInputChannel(room.id))
      commit('SET_CURRENT_ROOM', room)
      commit('SHOW_RIGHT')
      // Focus input
      commit('INPUT_FOCUS')
  },

  denotify ({commit}, {room, userChannel}) {
    commit('CLEAR_ROOM_NOTIFICATIONS', room)
    console.log("denotify to userchannel")
    return sendToChannel(userChannel, {room: room}, 'denotify')
  },

  createGroupRoom ({commit}, {roomChannel, users}) {
    return sendToChannel(roomChannel, {users: users}, 'add:group')
  },

  updateInterests ({commit}, {roomChannel, interests}) {
    commit('SET_CURRENT_ROOM_NEARBY_INDEX', interests)
    return sendToChannel(roomChannel, {interests: interests}, 'update:interests')
  },

  unwatch ({commit}, {user, roomChannel}) {
    console.log("unwatch user")
    // Unwatch user
    // tell server
    sendToChannel(roomChannel, {room_id: user.room_id, from:''}, 'unwatch')
    // commit locally
    commit('UNWATCH', user.id)
  },

  pause_watch ({commit}, {user, roomChannel}) {
    console.log("pause user broadcast")
    console.log(user)
    // Unwatch user
    // tell server
    sendToChannel(roomChannel, {room_id: user.room_id, from:''}, 'unwatch')
  },

  play_watch ({commit}, {user, roomChannel}) {
    console.log("play user broadcast")
    console.log(user)
    // Unwatch user
    // tell server
    sendToChannel(roomChannel, {room_id: user.room_id, from:''}, 'watch')
  },

  getIntroduced ({commit}, {userId, roomChannel}) {
    console.log("get introduced")
    // Get introduced to user
    return sendToChannel(roomChannel, {userId: userId}, 'add:introduction')
  }

}

// Helper functions
export const startSession = ({ commit }, {user, jwt, intro}) => {
    // Pingal Response
    commit('APPEND_SLIDE', {isPingal: true, text: intro})
    // Store jwt session and user
    commit('SET_CURRENT_USER', user)
    commit('SET_CURRENT_JWT', jwt)
    // Close existing socket and re-open for authenticated user
    closeSocket()
    socket.connect({guardian_token: jwt})
    let currentRoomChannel = joinPingalChannel(user.id)
    commit('SET_CURRENT_ROOM_CHANNEL', currentRoomChannel)
    commit('SET_CURRENT_ROOM_INPUT_CHANNEL', currentRoomChannel)
  }

export default actions