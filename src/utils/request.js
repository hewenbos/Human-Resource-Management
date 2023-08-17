import Axios from "axios";
import store from '@/store'
import { Message } from "element-ui";
import router from "@/router";
import Vue from "vue";
const http = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})


http.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  Vue.prototype.$loading.show({text:'加载数据中'})

  return config
}, err => {
  return Promise.reject(err)
})


http.interceptors.response.use((response) => {
  if (response.data instanceof Blob) return response.data
  if (Vue.prototype.$loading.isvisible()) {
    Vue.prototype.$loading.hide()
  }
  return response.data
}, err => {

  if (err.response && err.response.status === 401) {
    Message({
      message: 'token过期',
      type: 'warning'
    });

    store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(err)
  }


  return Promise.reject(err)
})


export default http