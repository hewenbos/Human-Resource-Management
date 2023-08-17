import Layout from '@/layout'
export default {
    path:'/approval',
    name:'approval',
    component:Layout,
    redirect:'/approval',
    children:[
        {
            path:'',
            name:'Approval',
            component :() => import('@/views/approval/index.vue'),
            meta:{icon:'link',title:'审批管理'}
        }
    ]
}