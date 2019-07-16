<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in states" :key="tab" />
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
    />
    <router-view></router-view>
  </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
let id = 0
export default {
  metaInfo: {
    title: 'The Todo App'
  },
  // 在组件渲染之前执行，所有这里拿不到组件的全局上下文（this）。在beforeEach和beforeResolve之间执行
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this)
    // 但是可以通过next()拿到组件的参数，在next里面写入一个回调函数，可以获取组件创建后的对象。
    next(vm => {
      console.log('after enter vm.id is', vm.id)
    })
  },
  // 在同一个路由下，路径发生变化时触发，如，同一路由下，通过不同的参数跳转页面时，会触发。
  beforeRouteUpdate (to, from, next) {
    console.log('todi update enter')
    next()
  },
  // 在离开页面时触发(在离开页面行为的一些判断，例如，页面有表单数据被修改但是没有保存，用户就点击其他路由路径，这是可以在用户离开前，提示用户)
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all',
      tabContent: '',
      states: ['all', 'active', 'completed']
    }
  },
  // 在组件跳转的时候，跳转的是同一组件的情况下，mounted方法方法是不会从新执行的，如果要监听数据的变化，只能通过watch或者boeforeRouteUpdate监听。（例如：通过/app/：id这样的方法的组件）
  mounted () {
    console.log('todo mounted')
  },
  components: {
    Item,
    Helper
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      console.log('e.target.value:')
      console.log(e.target.value)
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    handleChangeTab (value) {
      this.filter = value
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
.tab-container
  background-color: #fff
  padding: 0 15px
</style>
