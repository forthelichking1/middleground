import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()// 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token// 将数据设置给vuex
    setToken(token)
  },
  removeToken(state) {
    state.token = null// 将vuex的数据置空
    removeToken()// 同步到缓存
  }
}
const actions = {
  async  login(context, data) {
    const result = await login(data)// 接收data
    context.commit('setToken', result)// 调用mutations里的setToken
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
