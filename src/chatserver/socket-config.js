import { Socket } from 'phoenix-elixir'
import Cookies from 'js-cookie'

const { socketScheme, scheme, hostname } =
  process.env.NODE_ENV === 'production'
  ? { socketScheme: 'wss', scheme: 'https', hostname: window.location.hostname }
  : { socketScheme: 'ws', scheme: 'http', hostname: 'localhost:4010' }

export const apiURL = `${scheme}://${hostname}/api`
export const socketURL = `${socketScheme}://${hostname}/socket`
// const socketURL = 'ws://www.pingal.co:4010/socket'
// const apiURL = 'http://www.pingal.co:4010/api'

// a function to shut it all down
export const closeSocket = () => socket.disconnect()

// define the socket per user: anonymous, user_id
let jwt = Cookies.get('jwt')
export let socket = new Socket(socketURL, {});
socket.connect({guardian_token: jwt});