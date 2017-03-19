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

    APPEND_SLIDES (state, slides) {
        slides = slides.slides.reverse()
        // if (!Array.isArray(slides)) {
        //     slides = [slides]
        // }
        state.slides = state.slides.concat(slides)
    },

    APPEND_SLIDE (state, slide) {
        state.slides = state.slides.concat(slide);
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
        Cookies.set('user', user, {expires: 365})
    },

    SET_CURRENT_JWT (state, jwt) {
        state.jwt = jwt;
        Cookies.set('jwt', jwt, { expires: 365 });
    },

    LOG_OUT (state) {
        state.currentUser = {};
        Cookies.remove('user');
        Cookies.remove('jwt');
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


