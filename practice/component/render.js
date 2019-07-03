/* eslint-disable no-sequences */
import Vue from 'vue'

const component = {
  porps: ['props1'],
  name: 'compParent',
  /* template: `
      <div :style="style">
        <slot></slot>
      </div>
    `, */
  // render方法是将template中的内容渲染到页面
  render (createElement) {
    return createElement('div', {
      style: this.style
    //   on: {
    //     click: () => { this.$emit('click') }
    //   }
    }, [
      this.$slots.header,
      this.props1,
      this.value
    ])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'slot-scope'
    }
  }
}

new Vue({
  name: 'compVue',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '123',
      text: 123456
    }
  },
  el: '#root',
  /* template: `
    <div>
      <comp-one ref="comp">
        <div>{{value}}</div>
      </comp-one>
    </div>
  `, */
  mounted () {
  },
  methods: {
    handleClick () {
      console.log('aabbccdd')
    }
  },
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // 使用on事件，在子组件中需要使用$emit事件触发。
        // on: {
        //   click: this.handleClick
        // }，
        // 使用nativeOn事件，是不需要子组件在触发，就可以实现事件的
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          click: this.handleClick,
          domProps: {
            innerHTML: '<span>888</span>'
          },
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ])
  }
})
