const state = {
  /**
   * 角色分为
   *    管理员   admin
   *    学生    student
   */
  // 新版标准
  role: '',
  // id
  id: 0,
  // 用户名
  username: ''
}

const mutations = {
  SET_USERINFO: (state, user) => {
    state.user = { ...user }
  },
  RESET_USER: state => {
    state.user = { id: 0 }
  }
}

export default {
  state,
  mutations
}
