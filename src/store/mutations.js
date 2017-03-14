/* mutations :
Store is immutable. The only way to actually change state in a Vuex store is by committing a mutation.
Each mutation has a string type and a handler.
You cannot directly call a mutation handler.
To invoke a mutation handler, you need to call store.commit with its string type
*/
const mutations = {

    /* START <SLIDES MUTATION HANDLERS> */

    // slides are like posts but can have additional object properties, such as recommended channels, location, etc.
    SET_SLIDES (state, slides) {
        state.slides = slides
    },

    APPEND_SLIDES (state, slides) {
        if (!Array.isArray(slides)) {
            slides = [slides]
        }
        state.slides = slides.concat(state.slides)
    },

    /* START <CURRENT SLIDE MUTATION HANDLERS> */
    SET_CURRENT_SLIDE (state, slide) {
        state.currentslide = slide
    },

    DELETE_CURRENT_SLIDE (state) {
        state.currentslide = null
    },

    /* START <USER MUTATION HANDLERS> */
    SET_CURRENT_USER (state, user) {
        state.currentUser = { ...state.currentUser, ...user }
    },

    /* START <ROOM MUTATION HANDLERS> */
    SET_CURRENT_ROOM (state, room) {
        state.currentRoom = { ...state.currentRoom, ...room }
    },

    SET_ROOMS (state, rooms) {
        state.rooms = rooms
    },

    APPEND_ROOMS (state, rooms) {
        if (!Array.isArray(rooms)) {
            rooms = [rooms]
        }
        state.rooms = rooms.concat(state.slides)
    }

}

export default mutations


