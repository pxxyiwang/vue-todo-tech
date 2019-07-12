import Vue from 'vue'

import Component from './func-notification'

// 通过Vue.extend(Component)创建一个带有Component里面的内容的新组建模板
const NotificationConstructor = Vue.extend(Component)

// 创建组件的列表
const instances = []
// 控制创建组件的时候，保证组件的id不一样
let seed = 1

const notify = (options) => {
  // 判断是不是服务端渲染。服务端渲染时，没有dom，所以不能进行dom操作
  if (Vue.prototype.$isServer) return

  // 创建一个NotificationConstructor模板的vue组件
  const instance = new NotificationConstructor({
    propsData: options
  })

  const id = `notification_${seed++}`
  instance.id = id
  // instance.$mount()这样写的意思时，已经创建好了$el这个节点，但是还没挂载。（说明div标签已经有了）
  instance.vm = instance.$mount()
  // 将instance对象上面的$el(div)放在body上面
  document.body.appendChild(instance.vm.$el)

  // 计算高度
  let verticalOffset = 0
  // 拿到每一个instance，计算它在页面的位置
  instances.forEach(item => {
    // + 16 是让每个notification组件有间距
    verticalOffset += item.$el.offsetHeight + 16
  })
  // 这里加16是让最后一个notification组件与页面底部有个间距
  verticalOffset += 16
  // 将控制高度的值添加到组件里面
  instance.verticalOffset = verticalOffset
  // 将组件添加到组件列表里面
  instances.push(instance)
  // 返回新添的组件
  console.log('instance.vm:')
  console.log(instance.vm)
  return instance.vm
}

export default notify
