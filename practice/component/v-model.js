import Vue from 'vue'

// 父子之间传值双向绑定

const component = {
  // 可以给传过来的值重新命名和执行的事件
  model: {
    prop: 'value1',
    event: 'change'

  },
  props: ['value1'],
  template: `
      <div>
        <input type="text" @input="handleInput" :value="value1">
      </div>
    `,
  methods: {
    handleInput (e) {
    //   this.$emit('input', e.target.value)
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  //   data () {
  //     return {

  //     }
  //   }
  data: {
    value: '123',
    text: 123456
  },
  el: '#root',
  // ‘ :value="value" @input="value = arguments[0]" ’与‘ v-model="value" ’效果一样
  template: `
    <div>
        <comp-one :value="value" @input="value = arguments[0]"></comp-one>
        <comp-one v-model="value"></comp-one>
        <div>{{value}}</div>
    </div>
  `
})
