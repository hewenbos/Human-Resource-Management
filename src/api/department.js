import request from '@/utils/request'

//获取组织架构
export const getDepartMentApi = () => request.get('/company/department')

//获取员工列表
export const getSimpleUserApi = () => request.get('/sys/user/simple')

//添加部门
export const getAddCompanyApi = (data) => request.post('/company/department',data)

//编辑部门
export const getEditcompanyApi = (data) => request.put('/company/department/'+data.id,data)

//查询部门详情
export const getInfoCompanyApi = (data) => request.get('/company/department/'+data.id)

//删除部门
export const getDelComoanyApi = (data) => request.delete('/company/department/'+data.id)