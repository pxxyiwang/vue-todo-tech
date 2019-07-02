import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{ firstName + ' ' + lastName }}<span>(直接在标签中计算)</span></p>
      <p>Name: {{ getName() }}<span>(通过调用methods里面的getName方法得到)</span></p>
      <p>Name: {{ name }}<span>(在vue实例中通过computed计算属性计算，标签中直接引用计算属性中的方法名（注：方法名不用括号）)</span></p>
      <p>Number: {{ number }}</p>
      <p><input type="text" v-model="number"></p>
      <p>firstName:<input type="text" v-model="firstName"></p>
      <p>lastName:<input type="text" v-model="lastName"></p>
      <p>Name:<input type="text" v-model="newName"></p>
    </div>
  `,
  data: {
    firstName: 'p',
    lastName: 'xx',
    number: 0,
    fullName: '',
    obj: {
      a: ''
    }
  },
  // 计算属性
  computed: {
    // 等价于methods方法中的getName方法
    name () {
      console.log('computed name')
      return `${this.firstName} ${this.lastName}`
    },
    // 计算属性中，还可以设置它
    newName: {
      get () {
        console.log('get newName')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        console.log('set newName')
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    getName () {
      console.log('methods getName name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    // 最初时，watch绑定的方法时不会执行的，要监听对象改变的时候才会执行
    //   firstName (newName, oldName) {
    // this.fullName = newName + oldName
    //   }
    // immediate为true时，在绑定时，就会执行，如果为false，则绑定的时候不会执行，要等监听对象改变的时候才会会执行。默认为false
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.oldName
      },
      immediate: true
      //  deep: ture
    },
    /* deep属性表示深度监听，适应场景：如监听目标是一个对象，若是只改变对象中
      的其中一个属性，该事件是不会触发的。只能改变这个对象，或者使用deep：true。
      但是deep的计算量太大，不推荐使用，但是可以监听字符串的方式，将要监听的对象
      属性放入字符串中监听 */
    'obj.a': {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.oldName
      },
      immediate: true
    //  deep: ture
    }
  }
})
