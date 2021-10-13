import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    username: "",
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.userId = id
    },
    SET_USERNAME(state, username) {
      state.username = username
    },
  },
  actions: {
    setUserId({ commit }, id) {
      commit("SET_USER_ID", id)
    },
    setUsername({ commit }, username) {
      commit("SET_USERNAME", username)
    },
  },
})
