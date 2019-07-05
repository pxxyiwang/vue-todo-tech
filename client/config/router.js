import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 这个配置可以将浏览器的地址栏中的/#去除
    mode: 'history',
    // 可以在地址栏中加上/base/这个路径。如：http://localhost:8000/base/app
    // base: '/base/',
    // 这两个配置时给<router-link>标签配置公共的class
    linkActiveClass: 'active-link',
    linkExactiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        console.log(savedPosition)
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // 并不是所有的浏览器都支持前端路由跳转的，用fallback来处理，默认为true
    fallback: false
    // 处理url中携带的参数的两个方法
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
