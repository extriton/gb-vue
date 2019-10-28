export default {
    state: {
        reverse: false,
        userValue: 0,
    },
    getters: {
        REVERSE: state => {
            return state.reverse
        },
        USER_VALUE: state => {
            return state.userValue
        },
    },
    mutations: {
        INVERT_REVERSE: state => {
            state.reverse = !state.reverse
        },
        SET_USER_VALUE: (state, payload) => {
            state.userValue = payload
        },
    },
}