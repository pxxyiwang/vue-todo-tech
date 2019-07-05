// 和mutations方法差不多，但是它里面只能写同步操作的代码，而actions方法在里面可以写异步操作的代码
// 在组件中使用$store.dispatch()方法触发
export default {
  // 第二参数时个对象
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
