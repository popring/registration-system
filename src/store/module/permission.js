const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.permission.routes.push(...routes)
  }
}

export default {
  state,
  mutations
}
