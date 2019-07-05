<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <span>count:{{count}}</span>
    <span>text_a:{{text_a}}</span>
    <span>text_b:{{text_b}}</span>
    <span>{{fullName}}</span>
    <!-- <todo></todo> -->
    <!-- <router-view /> -->
    <!-- <router-link :to="{name: 'app'}">app</router-link> -->
    <!-- 传参方式的路由 类似于query -->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade"> 
      <router-view />
    </transition>
    <!-- <router-view name="a" /> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

// vuex的帮助方法
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$route)
    console.log(this.$store)
    // let i = 0
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // 使用...mapMutations
    // setInterval(() => {
    //   this.updateCount(i++)
    // }, 1000)

    // 使用异步操作sotre里面的值
    // this.$store.dispatch('updateCountAsync', {num: 5, time: 2000})
    // 如果使用...mapActions，那调用的时候应该这么写
    this.updateCountAsync({num: 5, time: 2000})

    // store模块化调用
    this['a/updateText']('88')
    this['b/updateText'](99)
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount', 'a/updateText', 'b/updateText'])
  },
  /* count () {
      return this.$store.state.count
    },
    fullName () {
      return this.$store.getters.fullName
    }
    这种写法太麻烦，vuex提供了一种更简单的方法
   */
  computed: {
    // 在 .babelrc文件中，默认不支持'...'的语法，需要安装依赖包来实现
    // ...mapState(['count'])和下面的count()效果一样。如果mapState里面的方法名不一样，可以这样写...mapState({counter: 'count'})
    // ...mapState(['count']),
    // 如果使用store模块化方式，则需要换一种写法
    ...mapState({
      count: (state) => state.count,
      text_a: (state) => state.a.text,
      text_b: (state) => state.b.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


