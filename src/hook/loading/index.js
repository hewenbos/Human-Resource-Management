


import loadingDocument from './loading.vue'
let isLoadingVisible = false
const  loadingComponent = {
    // install 方法：这是插件的安装方法，在 Vue 插件中被调用。它接受一个参数 Vue，即全局的 Vue 构造函数，用于在插件中进行操作。
    install(vue) {
        //创建一个 loading 组件的构造函数
        const loadingFun = vue.extend(loadingDocument)
        // 创建一个 loading 组件的实例
        const instance = new loadingFun()
        //将刚刚创建的 loading 组件实例 instance 手动挂载到一个新创建的 <div> 元素上。这是为了将组件实例转化为一个可以被 Vue 管理的实际 DOM 元素。
        instance.$mount(document.createElement('div'))

        //自定义的 $loading 对象添加到 Vue 原型上。
        vue.prototype.$loading = {
            //自定义方法 options 参数，允许你传递配置
            show(options){
                console.log(options?.text);
                instance.text = options?.text || '加载中'
                //将 loading 组件实例挂载到页面的 <body> 元素中
                document.body.appendChild(instance.$el)
                isLoadingVisible = true
            },
            //自定义方法
            hide(){
                console.log(111);
                // 页面中移除 loading 组件实例
                document.body.removeChild(instance.$el)
                isLoadingVisible = false
            },
            isvisible(){
                return isLoadingVisible
            }
        }
    }
}

//导出 挂载vue全局
export default loadingComponent