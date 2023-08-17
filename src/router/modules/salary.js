import Layout from '@/layout'

export default {
    path:'/salary',
    name:'salary',
    component:Layout,
    redirect:'/salary',
    children:[
        {
            path:'',
            name:'Salary',
            component:()=> import('@/views/salary/index.vue'),
            meta:{icon:'eye-open',title:'工资管理'}
        }
    ]
}