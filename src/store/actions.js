import { process } from '@/api'

const actions = {
  GET_PROCESS: async ({ commit }) => {
    const res = await process()
    if (res.code === 1) {
      commit('SET_PROCESS', res.data)
    }
  }
}

export default actions
