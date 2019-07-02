import Vue from 'vue'

new Vue({
  el: '#root',
  // 使用v-text原生指令时，元素就只能是v-text里面的内容，在标签里面添加任何其他的内容都不会显示
  // 使用v-html指令，可以转译html代码，使页面只显示节点里面的文本内容
  // 使用v-show，控制元素是否显示，元素还是在文档流里面的
  // 使用v-if，控制原始的是否存在，可以与v-show实现相同的效果，但是元素不会存在文档流里面，和v-else或v-else-if搭配
  // v-model数据双向绑定。用v-model可以很简单的炒作checkbox。v-model还有修饰符，例如：v-model.number可以让在input中输入的字符串变成数组。还有很多，请参照vue文档
  // v-pre:可以让标签上绑定的数据不会被解析
  // v-once：表示数据绑定只执行一次，下一次修改数据，这个元素中的数据就不会在改变了
  template: `
    <div>
      <div v-show="active" v-text="test">{{test}}haha</div>
      <div v-text="test" v-pre>{{test}}haha</div>
      <div v-pre>{{test}}</div>
      <div v-once>{{test}}</div>
      <div v-html="html">{{test}}haha</div>
      <ul>
        <li>遍历数组</li>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li>遍历对象</li>
        <li v-for="(val, key, index) in obj" :key="key">{{val}}:{{key}}:{{index}}</li>
      </ul>
      <div><input type="text" v-model="test"></div>
      <div><input type="checkbox" v-model="active"></div>
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
        <input type="checkbox" :value="4" v-model="arr">
      </div>
      <div>
        <input type="radio" value="1" v-model="picked">
        <input type="radio" value="2" v-model="picked">
      </div>
    </div>
    `,
  data: {
    test: 0,
    active: true,
    html: `<span>哈哈哈</span>`,
    arr: [1, 2, 3],
    obj: {
      a: 1,
      b: 2,
      c: 3
    },
    picked: ''
  }
})
