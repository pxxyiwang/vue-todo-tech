import Vue from 'vue'

const app = new Vue({
  //   el: '#root',
  template: '<div><div>{{hh}}</div><div>{{mm}}</div><div>{{ss}}</div><div>{{ obj.a }}</div></div>',
  data: {
    hh: 0,
    mm: 0,
    ss: 0,
    obj: {}
  }
}).$mount('#rood')

let intervalID = setInterval(() => {
  if (app.ss === 59) {
    app.ss = 0
    if (app.mm === 59) {
      app.mm = 0
      if (app.hh === 23) {
        app.hh = 0
        app.mm = 0
        app.ss = 0
      } else {
        app.hh += 1
      }
    } else {
      app.mm += 1
    }
  } else {
    app.ss += 1
  }
}, 1000)
console.log(intervalID)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
console.log(app.$options)
console.log(app.$root)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
console.log(app.$options)
// console.log(app.$root)
console.log(app.$isServer)
console.log(app.$children)

// 监听 使用$watch时，如果在组件被注销的时候，需要手动写一个注销watch的方法，若是直接在vue对象中使用watch这个方法，在组件被注销的时候，vue对象会自动注销watch，便不用自己手动注销watch了
const unWatch = app.$watch('ss', (newSs, oldSs) => {
  console.log(newSs + ':' + oldSs)
})
// 模拟watch注销
setTimeout(() => {
  // unWatch() 注销watch方法
  unWatch()
}, 2000)

// 事件监听 使用$on($once) 和 $emit方法配合
// 事件($on) 可以监听多次
app.$on('test', (a, b) => {
  console.log(`test emited ${a} + ${b}`)
})
// 事件（$once）只能监听一次
app.$once('text', (a, b) => {
  console.log(`text emited ${a} + ${b}`)
})
// 监听 使用重复调用函数方法演示$on 与$once的区别
setInterval(() => {
  app.$emit('test', 1, 2)
  app.$emit('text', 3, 4)
}, 1000)

// 给组建强制性重新渲染方法
// app.$forceUpdate()

// 给组件里面的对象后来添加属性方法
let i = 0
setInterval(() => {
  // app.$set(app.obj, 'a', i)
  app.obj.a = i
  i++
}, 1000)

// 在dom节点更新后,在对其进行操作的方法是nextTick()
