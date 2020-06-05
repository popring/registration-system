const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.permission.routes.push(...routes)
  },
  RESET_ROUTES: state => {
    state.permission.routes.splice(0, state.permission.routes.length)
  }
}

export default {
  state,
  mutations
}
