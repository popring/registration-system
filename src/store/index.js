import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import permission from './module/permission'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: user.state,
    permission: permission.state
  },
  mutations: {
    ...permission.mutations,
    ...user.mutations
  },
  getters,
  actions
})
