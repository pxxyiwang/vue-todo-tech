import Vue from 'vue'

const component1 = {
  template: `<div>child component: {{data.value}}</div>`,
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.$parent.$options.name)
    console.log(this.yeye, this.data.value)
  }
}

const component = {
  name: 'compParent',
  components: {
    Comp: component1
  },
  // 具名插槽<slot name="header"></slot>
  // slot-scope:可以在slot插槽上绑定值，然后父组件在外部通过slot-scope定义的名称引用子组件里面传过去的值。
  template: `
      <div :style="style">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <slot name="body"></slot>
        </div>
        <div class="scope">
          <slot name="scope" dataAA="aaaaaa" :value="value"></slot>
        </div>
        <Comp></Comp>
      </div>
    `,
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
  // 不推荐使用
  provide () {
    const data = {}

    Object.defineProperty(data, 'value', {
      // 提供一个get方法
      get: () => this.value,
      // 指定可读
      enumerable: true
    })

    return {
      yeye: this,
      data
    }
  },
  data () {
    return {
      value: '123',
      text: 123456
    }
  },
  //   data: {
  //     value: '123',
  //     text: 123456
  //   },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp">
        <div slot="header" ref="div">this is header</div>
        <div slot="body">this is body</div>
        <div slot="scope" slot-scope="data">{{data.value}} {{data.dataAA}} {{value}}</div>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  `,
  mounted () {
    // 可以通过在节点上绑定ref，然后通过$refs属性来拿取ref上对象的相关信息。当然也可操作修改值，但是建议尽量不要通过这中方式修改
    console.log(this.$refs.comp)
    console.log(this.$refs.div)
    console.log(this.$refs.comp.value)
  }
})
