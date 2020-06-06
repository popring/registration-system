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
  username: '',
  // 报名进度
  process: {
    apply: 0,
    pay: 0,
    check: 0,
    addgrade: 0,
    offer: 0
  }
}

const mutations = {
  SET_USERINFO: (state, user) => {
    state.user = { ...user }
  },
  RESET_USER: state => {
    state.user = { id: 0 }
  },
  SET_PROCESS: (state, process) => {
    state.user.process = process
  }
}

export default {
  state,
  mutations
}
