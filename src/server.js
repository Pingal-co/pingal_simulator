import store from './store'
import uniqueId from 'uniqid'
import Cookies from 'js-cookie'
import {
  joinWorldChannel, 
  joinPingalChannel,
  joinUserChannel,
  joinAllChannels
} from '@/chatserver'
/*
start the server

*/
export default function start() {

    // Load cookie data
  let user = Cookies.get('user');
  user = user ? JSON.parse(user) : null;
  store.commit('SET_CURRENT_USER', user)
  console.log(`connecting to server for user: ${store.getters.currentUser.name}, id: ${store.getters.currentUser.id}`)

  /* Fetch and Set the current user in case there's one */
  //if (localStorage.getItem('id_token')) {
  //  store.dispatch('currentUser')
  // }

  let jwt = Cookies.get('jwt');
  jwt = jwt ? jwt : null;
  store.commit('SET_CURRENT_JWT', jwt)

  let session = Cookies.get('session');
  store.commit('SET_SESSION', session)

  // Load current room as pings channel
  let currentRoomChannel = jwt ? joinPingalChannel(user.id) : joinWorldChannel(session);
  store.commit('SET_CURRENT_ROOM_CHANNEL', currentRoomChannel)
  store.commit('SET_CURRENT_ROOM_INPUT_CHANNEL', currentRoomChannel)

  let userChannel = jwt ? joinUserChannel(user.id) : null; // what should this default to
  store.commit('SET_USER_CHANNEL', userChannel)


}
