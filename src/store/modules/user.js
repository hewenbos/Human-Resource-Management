import { setToken, getToken, removeToken } from '@/utils/auth'
import { getLoginApi, getUserInfoApi } from '@/api/user'
import {resetRouter} from '@/router/index'
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state, token) {

    state.token = token
    setToken(token)

    console.log(token);
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}


const actions = {
  async login({ commit }, data) {
    let res = await getLoginApi(data)
    commit('setToken', res.data)
    console.log(res);
  },
  async UserInfo({ commit }) {
    let res = await getUserInfoApi()
    commit('setUserInfo', res.data)
    console.log(res);
    return res.data
  },
  logout({commit}) {
    commit('removeToken')
    commit('setUserInfo',{})
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}