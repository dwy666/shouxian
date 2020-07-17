
// state
const state = {
    telphone: ''
}

// getters
const getters = {
    getTelphone(state) {
        return state.telphone;
    },
}

// actions
const actions = {

}

// mutations
const mutations = {
    setTelphone(state, payload) {
        state.telphone = payload;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
