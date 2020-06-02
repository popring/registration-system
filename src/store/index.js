import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import permission from './module/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: user.state,
    permission: permission.state
  },
  mutations: {
    ...permission.mutations
  }
})
