import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
  userInfo: {} // 存储用户信息
}
const mutations = {
  setToken(state, token) {
    state.token = token// 将数据设置给vuex
    setToken(token)
  },
  removeToken(state) {
    state.token = null// 将vuex的数据置空
    removeToken()// 同步到缓存
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 将返回的数据浅复制给state.userInfo
    state.staffPhoto = { ...userInfo.staffPhoto }
  },
  removeInfo(state) {
    state.userInfo = {}
  } // 删除用户信息
}
const actions = {
  async  login(context, data) {
    const result = await login(data)// 接收data
    context.commit('setToken', result)// 调用mutations里的setToken
  },
  async  getUserInfo(context) {
    const result = await getUserInfo() // 接收axios方法返回的Promise对象
    const baseResult = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseResult })// 将数据传给mutation里的方法
    return result // 返回这个结果 目前作用未知
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
