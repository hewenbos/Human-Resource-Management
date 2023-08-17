import request from '@/utils/request'

//获取角色列表
export const getRoleListApi = (params) => request.get('/sys/role',{params})

//更新角色
export const getRoleEditApi = (data) => request.put('/sys/role/'+data.id,data)

//删除
export const getDelRoleApi = (data) => request.delete('/sys/role/'+data.id)

//添加角色
export const getAddRoleApi = (data) => request.post('/sys/role',data)

//获取权限列表
export const getRoulePermissionApi = () => request.get('/sys/permission')

//获取角色权限
export const getRouleInfoApi = (data) => request.get('/sys/role/'+data.id)

//修改角色权限
export const getEditPermissionApi = (data) => request.put('/sys/role/assignPrem',data)