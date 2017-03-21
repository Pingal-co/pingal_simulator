import router from '../router'
import store from '../store'
import uniqueId from 'uniqid'
import {socket, closeSocket} from './socket-config'

import Cookies from 'js-cookie'
/*
  To make it clean, I have three separate channels [User, Pingal, Room] to talk to Phoenix
  I am also adding a fourth "World" channel to see what everyone is talking to Pingal
  Idea: Users talk to pingal publicly till they are logged in.
*/

let DEFAULT_LOBBY = 'pings:lobby'

/*
  Internal Functions
*/

let isSlideInStore = (slideId) => {
  return store.getters.slides.find(slide => slide._id === slideId)
}

let isCurrentSlide = (slideId) => {
  const currentSlide = store.getters.currentSlide
  return currentSlide && currentSlide._id === slideId
}

let joinRoom = (roomName = DEFAULT_LOBBY, params = {}) => {
  const room = socket.channel(roomName, params)

  room.join()
    .receive('ok', _ => {
      console.log('joined successfully to pingal:lobby')
    })
    .receive('error', resp => {
      console.log(`Unable to join ${resp} `)
    })
    .receive('timeout', _ => {
      console.log('Check all connections: network, database, ...')
    })

  // add some room-level event handlers
  room.onError(event => console.log('Room error.', event))
  room.onClose(event => console.log('Room closed.'))

  return room
}


/* Channel.on functions */

let addSlide = (slide, delay = 0) => {
  setTimeout(function() {
    store.commit('APPEND_SLIDE', slide)
  }, delay)
} 

let addRoom = (room) => {
  store.commit('APPEND_ROOMS', room)
}

let getSlidesInRoom = (slides) => {
  console.log("getting slides in room")
  store.commit('APPEND_SLIDES', slides)
}

// Responses
const responseDelay = 300
let response = ({slide}) => {
  slide.isPingal = true
  addSlide(slide, responseDelay)
}

let responseSignUp = ({slide}) => {
  slide.type = 'signUp'
  slide.isPingal = true
  addSlide(slide, responseDelay)
}

let responseLogIn = ({slide}) => {
  slide.type = 'logIn'
  slide.isPingal = true
  addSlide(slide, responseDelay)
}

let responseSuggestTopic = ({slide}) => {
  slide.type = 'suggestTopic'
  slide.isPingal = true
  addSlide(slide, responseDelay)
}

let responseJoinTopic = ({slide, topicRoom}) => {
  // Join topic logic here
  slide.isPingal = true
  addSlide(slide, responseDelay)
  addRoom(topicRoom)
}

let responseLogOut = ({slide}) => {
  store.commit('LOG_OUT')
  slide.isPingal = true
  addSlide(slide, responseDelay)
}

/* 
  External Functions
*/
export let sendToChannel = (room, slide, event = 'add:slide') => {
  console.log('sending to room...');
  room.push(event, slide)
        .receive('ok', (msg) => console.log('sent'))
        .receive('error', (reasons) => console.log('failed', reasons))
}

export let joinUserChannel = ({ id, jwt }) => {
  let userChannel = socket.channel(`users:${id}`, { token: jwt })

  userChannel.join()
    .receive('ok', (msg) => console.log('user joined'))
  return userChannel
}

export let joinWorldChannel = (session) => {
  let path = DEFAULT_LOBBY + ":" + session
  let roomChannel = joinRoom(path)

  roomChannel.on('get:slides_in_room', getSlidesInRoom)

  roomChannel.on('response:', response)
  roomChannel.on('response:signUp', responseSignUp)
  roomChannel.on('response:suggestTopic', responseSuggestTopic)
  roomChannel.on('response:joinTopic', responseJoinTopic)
  roomChannel.on('response:logIn', responseLogIn)
  roomChannel.on('response:logOut', responseLogOut)


  roomChannel.on('add:slide', addSlide)

  return roomChannel
}

export let joinPingalChannel = ({ userId, jwt }) => {
  let roomChannel = joinRoom(`pingal:${userId}`, { token: jwt })

  roomChannel.on('get:slides_in_room', getSlidesInRoom)

  roomChannel.on('add:slide', addSlide)

  return roomChannel
}

export let joinRoomChannel = (roomId) => {
  let roomChannel = joinRoom(`rooms:${roomId}`, {})

  roomChannel.on('get:slides_in_room', getSlidesInRoom)

  roomChannel.on('add:slide', addSlide)

  return roomChannel
}
