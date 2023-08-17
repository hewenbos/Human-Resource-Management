import http from '@/utils/request'


//登录
export const getLoginApi = (data) => http.post('/sys/login',data)


//获取用户信息
export const getUserInfoApi = () => http.get('/sys/profile')