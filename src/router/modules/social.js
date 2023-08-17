import Layout from '@/layout'

export default {
    path:'/social',
    name:'social',
    component:Layout,
    redirect:'/social',
    children:[
        {
            path:'',
            name:'Social',
            component:()=> import('@/views/social/index.vue'),
            meta:{icon:'form',title:'社保管理'}
        }
    ]
}