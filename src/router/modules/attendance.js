import Layout from '@/layout'

export default {
    path:'/attendance',
    name:'attendance',
    component:Layout,
    redirect:'/attendance',
    children:[
        {
            path:'',
            name:'Attendance',
            component:()=> import('@/views/attendance/index.vue'),
            meta:{icon:'table',title:'考勤管理'}
        }
    ]
}