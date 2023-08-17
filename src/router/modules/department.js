import Layout from '@/layout'

export default {
    path:'/department',
    name:'department',
    component:Layout,
    redirect:'/department',
    children:[
        {
            path:'',
            name:'Department',
            component:()=> import('@/views/department/index.vue'),
            meta:{icon:'tree',title:'组织架构'}
        }
    ]
}