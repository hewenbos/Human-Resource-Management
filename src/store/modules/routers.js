import {constantRoutes} from '@/router/index'
export default {
    namespaced:true,
    state:{
        routers:constantRoutes
    },
    mutations:{
        setRouter(state,routerList){
            state.routers = [...constantRoutes,...routerList]
        }
    }
}