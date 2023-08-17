import request from '@/utils/request'

//获取权限
export const getPermissionApi = () => request.get('/sys/permission')

//删除权限
export const getDelPermissionApi = (data) => request.delete('/sys/permission/'+data.id)

//添加权限
export const getAddPermissionApi = (data) => request.post('/sys/permission',data)

//获取权限详情
export const getInfoPermissionApi = (data) => request.get('/sys/permission/'+data.id)

//修改权限
export const getEditPermissionApi = (data) => request.put('/sys/permission/'+data.id,data)