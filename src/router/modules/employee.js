import Layout from '@/layout'

export default {
    path:'/employee',
    name:'employee',
    component:Layout,
    redirect:'/employee',
    children:[
        {
            path:'',
            name:'Employee',
            component:()=> import('@/views/employee/index.vue'),
            meta:{icon:'eye',title:'员工管理'}
        },
        {
            path:'detail/:id?',
            name:'detail',
            hidden:true,
            component:()=> import('@/views/employee/children/detail.vue'),
        }
    ]
}