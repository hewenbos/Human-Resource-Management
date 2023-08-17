import Cookies from 'js-cookie'
import router from '@/router'
const myToken = 'HC_TOKEN'

export const setToken = (token) => {
  Cookies.set(myToken, token)
  router.push('/')
}

export const getToken = () => {
  return Cookies.get(myToken)
}

export const removeToken = () => {
  return Cookies.remove(myToken)
}