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
  },
  actions: {
    setUserId({ commit }, id) {
      commit("SET_USER_ID", id)
    },
  },
})
