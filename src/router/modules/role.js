import Layout from '@/layout'

export default {
    path:'/role',
    name:'role',
    component:Layout,
    redirect:'/role',
    children:[
        {
            path:'',
            name:'Role',
            component:()=> import('@/views/role/index.vue'),
            meta:{icon:'password',title:'角色管理'}
        }
    ]
}