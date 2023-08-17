import request from '@/utils/request'

//获取员工列表
export const getEmployeeUserApi = (params) => request.get('/sys/user', { params })

//添加员工
export const getEmployeeAddApi = (data) => request.post('/sys/user', data)

//获取员工信息
export const getEmployeeInfoApi = (params) => request.get('/sys/user/' + params.id)

//修改员工信息
export const getEmployeeEditApi = (data) => request.put('/sys/user/' + data.id, data)

//删除员工信息
export const getEmployeeDel = (data) => request.delete('/sys/user/' + data.id)

//excel导出员工信息表
export const getUserExoprtApi = () => {
    return request({
        url: '/sys/user/export',
        responseType: 'blob'
    })
}

//excel 导入员工信息
export const getUserImportApi = (data) => {
    return request({
        url: '/sys/user/import',
        method: 'post',
        data
    })
}


//下载导入模块
export const getDownloadApi = () => {
    return request({
        url: '/sys/user/import/template',
        responseType: 'blob'
    })
}


//获取角色信息
export const getRoleInfoApi = () => {
    return request({
        url:'/sys/role/list/enabled'
    })
}


//分配角色
export const getAssginApi = (data) => {
    return request({
        url:'/sys/user/assignRoles',
        method:'put',
        data
    })
}