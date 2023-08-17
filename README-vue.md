 ### vuex
 ```js
    vuex 集中式状态管理工具
    适用于大型项目
    5大核心: 
           state : 存放数据
           gettres : 相当于计算属性
           actions  : 异步操作 不能修改state的数据 dispatch操作actions方法 
           mutations : 操作方法也是唯一可以修改state数据的地方 commit 操作mutations方法
           modules
    使用两种方式: 直接使用 映射函数
    映射函数:
            mapState mapGettres 写在计算属性
            mapMutations mapActions 写在方法里
 ```



### vuex模块化
```js
为什么要用模块化: 所有数据都在一个文件结构不清晰 , 容易混乱
使用:  
       新建文件 
       export default {} 导出对象
       每个模块都有 state actions mutations getters  
       开启namespaced : true  命名空间

       import 导出模块
       在父模块:
              modules:{
                     模块名: 导出的模块名
              }
       
       实名映射函数的方式来获取每个模块的方法和数据
              例:  ...mapState(模块名,[数据])

```


### export 和 exports 的区别
```js
exports是module.exports的引用，可以通过exports添加属性或方法；
export是ES6的导出语法，用于导出具体的变量、函数等。

需要注意的是，在一个模块文件中，不能同时使用export和exports导出内容，因为它们是不兼容的。
```

### 跨域

```js
       
       代码:
              devServer: {
                    port: port,//端口
                    open: true,//启动自动打开浏览器
                    proxy: {
                    //接口是以 /api 开头的需要跨域
                           '/api': {
                                  //要代理的地址
                                  target:'https://heimahr.itheima.net'
                           }
                    }
              },
       跨域有开发环境和生成环境跨域 
       npm run dev   开发环境 : env.development  
       npm run build 生产环境 : env.production

       为了解决生产环境和开发环境 每次都要切换代理地址 baseURL为 process.env.常量
```
### render 函数
```js
符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。



```
### slot
```js
`slot`又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的 

有三种写法:
       #name值
       v-slot:name值
       slot="name值"


匿名插槽
       slot没有名字
       如果以#号的方式要写default
具名插槽
       带有name名的slot , 使用时要用template标签包裹 并通过 #name值 或 v-slot:name值 、slot="name值" 来找到要渲染的插槽

作用域插槽

       可以是匿名 也可以是具名 ， 可以将子组件的数据通过slot插槽 , 传给父组件 让父组件根据子组件传递过来的数据来决定怎样渲染该插槽

       1.slot标签已添加属性的方式传值 , 所有的属性都被收集到一个对象里
       <slot :row={name:'李四',age:18,sex:'男'}></slot>
       2.在template 中 通过#name值="对象名" 或者 v-slot:name值 ="对象名" 来接收数据
       <template v-slot:name="obj">{{ obj }}</template>

```

### 为什么element 的自定义校验要写在data里
```js

Element 的自定义校验写在 data 中是为了提供更好的代码组织和维护性，并符合 Vue.js 的数据驱动思想。这样做能够使代码更加模块化、可扩展和易于理解。
```