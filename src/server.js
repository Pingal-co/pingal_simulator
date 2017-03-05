import store from './store'
import { socket, joinWorldChannel } from './chatserver'

/*
start the server

*/
export default function start() {
  console.log(`connecting to server for user: ${store.getters.currentUser.name} and id: ${store.getters.currentUser.id}`)

  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))

  /* Connect the socket to establish the WS connection with the server */
  socket.connect()

  /* Join the :posts channel to receive RT messages related to the posts */
  joinWorldChannel()

  /* Fetch and Set the current user in case there's one */
  if (localStorage.getItem('id_token')) {
    store.dispatch('currentUser')
  }

}
