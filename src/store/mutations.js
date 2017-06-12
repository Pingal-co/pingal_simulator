/* mutations :
Store is immutable. The only way to actually change state in a Vuex store is by committing a mutation.
Each mutation has a string type and a handler.
You cannot directly call a mutation handler.
To invoke a mutation handler, you need to call store.commit with its string type
*/
import Cookies from 'js-cookie'
import _ from 'lodash'

const mutations = {

    /* START <SLIDES MUTATION HANDLERS> */

    // slides are like posts but can have additional object properties, such as recommended channels, location, etc.
    SET_SLIDES (state, slides) {
        state.slides = slides
    },

    CLEAR_SLIDES (state) {
        state.slides = []
    },

    APPEND_SLIDES (state, slides) {
        slides = slides.reverse()
        // if (!Array.isArray(slides)) {
        //     slides = [slides]
        // }
        let slds = state.slides.concat(slides)
        state.slides = _.uniq(slds, (sld) => {return sld.id})
    },

    APPEND_SLIDE (state, slide) {        
        state.slides = state.slides.filter(sld => sld.id != slide.id).concat(slide)
    },

    APPEND_REPLY (state, reply) {
        let parent = state.slides.filter(slide => slide.id === reply.parent_id)[0]
        parent.replies = parent.replies.concat(reply)
    },

    /* START <CURRENT SLIDE MUTATION HANDLERS> */
    SET_CURRENT_SLIDE (state, slide) {
        state.currentSlide = slide
    },

    DELETE_CURRENT_SLIDE (state) {
        state.currentSlide = null
    },

    /* START <USER MUTATION HANDLERS> */
    SET_CURRENT_USER (state, user) {
        state.currentUser = { ...state.currentUser, ...user }
        Cookies.set('user', user, {expires: 365})
    },

    SET_CURRENT_JWT (state, jwt) {
        state.jwt = jwt;
        Cookies.set('jwt', jwt, { expires: 365 });
    },

    SET_SESSION (state, session) {
        state.session = session
    },

    SET_USER_CHANNEL (state, userChannel) {
        state.userChannel = userChannel 
    },

    SET_USERS (state, users) {
          // filter out your own name, show everyone except yourself
       //users = users.filter(user => user.id != state.currentUser.id) 
       // avoid duplicate user objects
      users = users.filter(user => {
           for (let u=0; u<state.connections.length; u++) {
                if (state.connections[u].id == user.id) {
                    return false
                }
           }
           return true
       })
       state.connections = state.connections.concat(users)

    },

    LOG_OUT (state) {
        state.currentUser = null;
        state.rooms = [];
        Cookies.remove('user');
        Cookies.remove('jwt');
    },

    SET_CURRENT_ROOM (state, room) {
        state.currentRoom = room
    },
    CLEAR_ROOM_NOTIFICATIONS (state, room) {
        let clearRoom = state.rooms.filter(r => r.id === room.id)[0]
        clearRoom.user_active_notifications = [];
        clearRoom.alert = false;
    },
    SET_CURRENT_ROOM_NEARBY_INDEX (state, nearby_index) {
        state.currentRoom.nearby_index = nearby_index
    },

    /* START <ROOM MUTATION HANDLERS> */
    SET_CURRENT_ROOM_CHANNEL (state, roomChannel) {
        state.currentRoomChannel = roomChannel // { ...state.currentRoom, ...room }
    },

    SET_CURRENT_ROOM_INPUT_CHANNEL (state, inputChannel) {
        state.currentRoomInputChannel = inputChannel // { ...state.currentRoom, ...room }
    },

    SET_ROOMS (state, rooms) {
        state.rooms = rooms.reverse()
    },

    APPEND_ROOMS (state, rooms) {
        if (!Array.isArray(rooms)) {
            rooms = [rooms]
        }
        state.rooms = rooms.concat(state.rooms) 
    },

    WATCH (state, users) {
        state.connections = state.connections.concat(users)
    },

    UNWATCH (state, userId) {
        let connections = state.connections.filter(user => user.id != userId)
        state.connections = connections
    },

    SHOW_RIGHT (state) {
        state.showRight = true
    },
    HIDE_RIGHT (state) {
        state.showRight = false
    },
    SHOW_LEFT (state) {
        state.showLeft = true
    },
    HIDE_LEFT (state) {
        state.showLeft = false
    },

    /* INPUT TOOLBAR */
    UPDATE_INPUT_TEXT (state, text) {
        state.currentInput.text =  text
    },

    INPUT_FOCUS (state) {
        state.currentInput.focus += 1
    },

    TOGGLE_SHOW_RIGHT (state) {
        state.showRight = !state.showRight
    },

    TOGGLE_SHOW_LEFT (state) {
        state.showLeft = !state.showLeft
    },

     SET_BOT (state, bot) {
        state.bot = bot
    },

    UPDATE_CURRENT_SLIDE_BRAIN_INDEX (state, index_terms) {
        let terms = state.currentSlide.brain.index_terms[0]
        let keyphrase = state.currentSlide.brain.keyphrases[0]
        terms[keyphrase] = index_terms
    }

}

export default mutations


