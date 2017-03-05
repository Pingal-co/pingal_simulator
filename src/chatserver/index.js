import { socket, sendToChannel, joinUserChannel, joinPingalChannel, joinRoomChannel, joinWorldChannel } from './socket-api'
import { httpGet, httpPost, httpUpdate, httpDelete } from './http-api'

const { socketScheme, scheme, hostname } =
  process.env.NODE_ENV === 'production'
  ? { socketScheme: 'wss', scheme: 'https', hostname: window.location.hostname }
  : { socketScheme: 'ws', scheme: 'http', hostname: 'localhost:4010' }

const apiURL = `${scheme}://${hostname}/api`
const socketURL = `${socketScheme}://${hostname}/socket`
// const socketURL = 'ws://www.pingal.co:4010/socket'
// const apiURL = 'http://www.pingal.co:4010/api'

// a function to shut it all down
const closeSocket = () => socket.disconnect()

export {
  socket, closeSocket,
  apiURL, socketURL,
  httpGet, httpPost, httpUpdate, httpDelete,
  joinUserChannel, joinPingalChannel, joinRoomChannel, joinWorldChannel,
  sendToChannel
}