import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

// 引入router
import VueRouter from 'vue-router'
import createRouter from './config/router'

// 引入vuex文件
import Vuex from 'vuex'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

// 使用服务器渲染，防止内存溢出的操作
const router = createRouter()
const store = createStore()

// 动态加载一个新的vuex模块，然后直接在组件中按照正常的vuex（store）使用方式使用
store.registerModule('c', {
  state: {
    text: 3
  }
})
// vuex解绑
// store.unregisterModule('c')

// vuex的监听 只有当‘(state) => state.count + 1’这一串中的值(相当于sotre中的getter方法)发生变化（或者说执行完后），才执行后面的回调函数
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched:', newCount)
})

// vuex中sunscribe方法，只要vuex中的mutations方法被调用，就执行方法中的回调函数
store.subscribe((mutation, state) => {
  console.log(mutation.type) // mutations的名字
  console.log(mutation.payload) // mutations接收的参数
})

// vuex中sunscribeActions方法，只要vuex中的actions方法被调用，就执行方法中的回调函数
store.subscribeAction((actions, state) => {
  console.log(actions.type)
  console.log(actions.payload)
})

// 设置路由导航卫士(路由钩子) 路由钩子不仅可以在渲染全局vue时定义，还可以在设置路由时定义，还可以在组件内部定义
// 跳转之前执行 例如判断用户直接输入路径进入主页面时，用户是否登陆，如没有，便跳转到在登陆页面
router.beforeEach((to, from, next) => {
  console.log('before each')
  /* if (to.fullPath === '/login') {
    console.log('is login')
    // next()可以直接在里面写路由的path，也可以写成router的格式。next('/login')或者next({path: '/login, ...})
    next()
  } else {
    console.log('no login')
    next()
  } */
  next()
})

// 跳转之前执行，在beforeEach之后执行的
router.beforeResolve((to, from, next) => {
  console.log('before resolve')
  next()
})

// 跳转结束之后执行 不需要next函数
router.afterEach((to, from) => {
  console.log('after each')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
