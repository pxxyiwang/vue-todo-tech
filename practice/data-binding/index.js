import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    html: '<span>123</span>',
    aa: 'main',
    isActive: false,
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'blue'
    }
  },
  // v-html的用法可以转译html标签，直接显示标签中节点的内容
  // v-bind的用法，将标签上的属性变成动态的。简写‘:’
  // 动态绑定class,可以通过动态变量来控制标签class的改变。下面三种写法效果是一样的，其中[{}]这种方式可以动态便规定多个class
  // 动态便规定样式（style），如果是数组的方式，相同的属性时，后一个属性的值会覆盖前一个属性的值
  template: `
    <div v-bind:id="aa" :class="{ active : !isActive }">
      <p v-html="html" :class="[ isActive ? 'active' : '' ]" :style="styles"></p>{{html}}
      <p :class="[{ active: !isActive }]" :style="[styles, styles2]">哈哈哈</p>
    </div>
`
})
