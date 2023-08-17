import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
//导入loading
import loadingComponent from './hook/loading'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


//通过自定义指令实现按钮鉴权

Vue.directive('depart', {
  inserted(el, binding) {
    const { roles: { points } } = store.getters.userInfo
    console.log(points);
    if (!points.includes(binding.value)) {
      el.remove()
    }
  }
})



if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

//全局挂载loading插件
Vue.use(loadingComponent)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
