/* mutations :
Store is immutable. The only way to actually change state in a Vuex store is by committing a mutation.
Each mutation has a string type and a handler.
You cannot directly call a mutation handler.
To invoke a mutation handler, you need to call store.commit with its string type
*/
import Cookies from 'js-cookie'

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
        state.slides = state.slides.concat(slides)
    },

    APPEND_SLIDE (state, slide) {
        state.slides = state.slides.concat(slide);
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

    SET_USERS (state, users) {
        state.connections = users
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

    WATCH (state, user) {
        state.connections = state.connections.concat(user)
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

}

export default mutations


