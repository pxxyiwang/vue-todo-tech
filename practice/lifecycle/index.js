import Vue from 'vue'

const app = new Vue({
//   el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'haha'
  },
  // vue实例创造之前
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  // vue实例创造之后
  created () {
    console.log(this, 'created')
  },
  // vue实例挂载之前
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  // vue实例挂载之后
  mounted () {
    console.log(this, 'mounted')
  },
  // vue实例修改之前
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  // vue实例修改之后
  updated () {
    console.log(this, 'updated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  activated () {
    console.log(this, 'activated')
  },
  // vue实例销毁之前
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  // vue实例销毁之后
  destroyed () {
    console.log(this, 'destroyed')
  },
  // 和template实现的是一样的效果，它是在beforeMount方法和mounted方法之间执行的
  /* render (h) {
    console.log('rebder function')
    // throw new TypeError('render error')
    // return h('div', {}, this.text) // 和 这句‘template: '<div>{{text}}</div>'’代码效果一样
  }, */
  // 这个方法主要是在开发的时候才会调用，打包上线时不会调用的。这个方法是只有render方法出现错误的时候才会被触发调用，只能捕获当前组件render的错误
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  // 这个方法是在线上环境上调用的。能够收集到vue实例线上所有报错的错误。写法与renderError一样
  errorCaptured () {
    // 会向上冒泡，在正式环境中使用

  }
})

// 触发beforeMount方法与mounted方法
app.$mount('#root')

// 触发beforeUpdate方法与updated方法
app.text = 'bbbb'

app.$destroy()
