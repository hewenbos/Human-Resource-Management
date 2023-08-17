
import Layout from '@/layout'

export default {
    path:'/permission',
    name:'permission',
    component:Layout,
    redirect:'/permission',
    children:[
        {
            path:'',
            name:'Permission',
            component:()=> import('@/views/permission/index.vue'),
            meta:{icon:'nested',title:'权限管理'}
        }
    ]
}