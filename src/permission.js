import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 引入NProgress
import 'nprogress/nprogress.css' // 引入NProgress样式
import { MyRouters } from './router'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: true }) // 是否开启右上角加载图标
const whiteList = ['/login', '404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      let path = to.path
      if (!store.getters.userId) {

        let res = await store.dispatch('user/UserInfo')

        let filterRouter = MyRouters.filter(item => {
          return res.roles.menus.includes(item.name)
        })

        store.commit('routers/setRouter', filterRouter)
        
        router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])

        next(path)
      }
      next()
      

    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
