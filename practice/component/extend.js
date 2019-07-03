import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    // propOne: {
    //   required: true
    // }
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}+{{text2}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('compoent mounted')
    console.log(this.$parent.$options.name)
    this.$parent.text3 = 99
  }
}

const parent = new Vue({
  name: 'parent'
})

const compoent2 = {
  name: 'compoent2',
  extends: compoent,
  data () {
    return {
      text: 1,
      text2: 2
    }
  },
  mounted () {
    console.log('compoent mounted')
    // 子可以通过this.$parent操作父的一些内容
    console.log(this.$parent.$options.name)
    // 子改变父的data的变量
    // this.$parent.text3 = 5
  }
}

new Vue({
  parent: parent,
  name: 'rootVue',
  el: '#root',
  data: {
    text3: '3'
  },
  components: {
    Comp: compoent2
  },
  template: `
    <div>
      <div>{{text3}}</div>
      <Comp></Comp>
    </div>
  `,
  // 继承中，会先执行继承之前的mounted，然后才执行继承之后的mounted
  mounted () {
    console.log('compoent2 mounted')
    console.log(this.$parent.$options.name)
  }
})

/* // 将一个vue格式的对象放入Vue.extend这个方法中，返回的是一个vue对象。
const CompVue = Vue.extend(compoent)

new CompVue({
  el: '#root',
  // 如果compoent对象中的props里面的参数是规定了必须传递的，那么在这里，必须要以propsData这个节点名传递
  propsData: {
    propOne: 'haha'
  },
  // 新建的对象中的data里面的参数，会和commpoent中的data合并。如果和compoent中data里面的参数名字一样，则会覆盖它
  data: {
    text: '123',
    text2: '456'
  },
  // 新建的对象中的mountd里面的参数，会和commpoent中的mountd合并。并且compoent中的mountd对先执行
  mounted () {
    console.log('CompVue mounted')
  }
}) */
