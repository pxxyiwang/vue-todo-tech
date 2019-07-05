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
