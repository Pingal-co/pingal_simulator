import router from '../router'
import store from '../store'
import uniqueId from 'uniqid'
import {socket, closeSocket} from './socket-config'
import { Presence } from 'phoenix-elixir'

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
      console.log(`joined successfully to ${roomName}`)
    })
    .receive('error', resp => {
      console.log(`Unable to join ${resp} `)
    })
    .receive('timeout', _ => {
      console.log('Timeout: Check all connections: network, database, ...')
    })

  // add some room-level event handlers
  room.onError(event => console.log('Room error.', event))
  room.onClose(event => console.log('Room closed.'))

  return room
}

/* Channel.on functions */

let addSlide = (slide, delay = 0) => {
  setTimeout(function() {
    console.log(slide)
    if (!('text' in slide)) {
      // joining or leaving event: 
      if (Object.keys(slide["joins"]).length > 0) {
        let first = slide["joins"]
        
        let u = first[Object.keys(first)[0]]
        console.log(u)
        slide.text = `User ${u.user.name} joined`
      } else {
        let first = slide["leaves"]
        let u = first[Object.keys(first)[0]]
        slide.text = `User ${u.user.name} left`
      }
      
    }
    store.commit('APPEND_SLIDE', slide)
    store.commit('SET_CURRENT_SLIDE', slide)
  }, delay)
} 

let addReply = ({slide}) => {
  store.commit('APPEND_REPLY', slide)
}

let getSlidesInRoom = (data) => {
  store.commit('SET_SLIDES', data.slides)
}

let getUsersInRoom = (data) => {
  store.commit('SET_USERS', data.users)
}

// Direct object match responses

let addRooms = ({rooms}) => {
  store.commit('APPEND_ROOMS', rooms)
}

let setRooms = ({rooms}) => {
  store.commit('SET_ROOMS', rooms)
}

let addGroup = ({room}) => {
  addRooms({rooms: room})
  store.commit('CLEAR_SLIDES')
  store.commit('SET_CURRENT_ROOM_CHANNEL', joinRoomChannel(room.id))
  store.commit('SET_CURRENT_ROOM_INPUT_CHANNEL', joinRoomInputChannel(room.id))
  store.commit('SET_CURRENT_ROOM', room)
  store.commit('SHOW_RIGHT')
  // Focus input
  store.commit('INPUT_FOCUS')
}

let addIntroduction = ({room}) => {
  addGroup({room})
}

let watch = ({room_id, user}) => {
  store.commit('WATCH', user)
}

let renderPresence = (presences) => {
  console.log("Presence")
  const users_in_room = [];
  Presence.list(presences, (id, obj) => {
        return { 
            ...obj.user,
            room_id: obj.metas[0].room_id
          }})           
          .map(user => users_in_room.push(user));

  console.log(users_in_room)
  store.commit('SET_USERS', users_in_room)
};

// Response:
const responseDelay = 300
let response = ({slide, topicRoom}) => {
  //slide.type = 'suggestTopic'
  // slide.isPingal = true
  console.log("Name or Interest or Something Else (slide v)")
  console.log(slide)

  
  if (slide && "topicRoom" in slide ) {
      addRoom(topicRoom)
  }
  if (slide && slide.type === 'logOut') {
    store.commit('LOG_OUT')
  }
  if (slide && slide.type === 'joinTopic') {
    console.log("join Topic room")
    addRooms({rooms: topicRoom})
  }

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

  // pingal response
  roomChannel.on('response:', response)
  roomChannel.on('response:name', response)
  roomChannel.on('response:interests', response)
  roomChannel.on('response:signUp', response)
  roomChannel.on('response:suggestTopic', response)
  roomChannel.on('response:logIn', response)
  roomChannel.on('response:joinTopic', response)
  roomChannel.on('response:logOut', response)
  roomChannel.on('response:planIntroduction', response)
  roomChannel.on('response:brain', response)
  roomChannel.on('response:dialogPingal', response)

  // user text message
  roomChannel.on('add:slide', addSlide)

  return roomChannel
}

export let joinPingalChannel = (userId) => { //, jwt 
  let roomChannel = joinRoom(`pings:user:${userId}`) //, { token: jwt } authenticating on socket directly instead

  roomChannel.on('get:slides_in_room', getSlidesInRoom)

  roomChannel.on('response:', response)
  roomChannel.on('response:signUp', response)
  roomChannel.on('response:suggestTopic', response)
  roomChannel.on('response:joinTopic', response)
  roomChannel.on('response:logIn', response)
  roomChannel.on('response:logOut', response)
  roomChannel.on('response:planIntroduction', response)
  roomChannel.on('response:brain', response)
  roomChannel.on('response:dialogPingal', response)

  roomChannel.on('set:rooms', setRooms)
  roomChannel.on('add:rooms', addRooms)
  roomChannel.on('add:slide', addSlide)

  return roomChannel
}

let presences = {}
export let joinRoomChannel = (roomId) => {
  let roomChannel = joinRoom(`rooms:${roomId}`, {})


  roomChannel.on('get:slides_in_room', getSlidesInRoom)
  //roomChannel.on('get:users_in_room', getUsersInRoom)

  roomChannel.on('add:slide', addSlide)
  roomChannel.on('add:reply', addReply)

  roomChannel.on('add:group', addGroup)
  roomChannel.on('add:introduction', addIntroduction)
  roomChannel.on('response:brain', response)
  roomChannel.on('response:dialogPingal', response)

  //roomChannel.on('watch', watch)
    // presence
  roomChannel.on("presence_state", state => {
      //console.log(state)
      presences = Presence.syncState(presences, state)
      console.log(presences)
      renderPresence(presences)
  })
  roomChannel.on("presence_diff", diff => {
      presences = Presence.syncDiff(presences, diff)
      console.log(presences)
      renderPresence(presences)
  })
  
  return roomChannel
}

export let joinRoomInputChannel = (roomId) => {
  let roomInputChannel = joinRoom(`rooms:input:${roomId}`, {})
  roomInputChannel.on('add:slide', addSlide)
  roomInputChannel.on('add:reply', addReply)
    // presence
  roomInputChannel.on("presence_state", state => {
      //console.log(state)
      presences = Presence.syncState(presences, state)
      console.log(presences)
      renderPresence(presences)
  })
  roomInputChannel.on("presence_diff", diff => {
      presences = Presence.syncDiff(presences, diff)
      console.log(presences)
      renderPresence(presences)
  })
  return roomInputChannel
}

