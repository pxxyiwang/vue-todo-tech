// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props方式的传值：Todo页面可以i通过props这个属性接收路由传的值，不需要在通过this.$route这种方式获取url中的值，能是页面之间没那么多耦合。以下三种方式都支持
    props: true,
    // props: {
    //   id: 456
    // },
    // props: (route) => ({id: router.query.b}),

    /* // 在一个路由同时显示多个组件时，可以使用components。同时在父页面也需要多个<router-view/>配合使用
    components: {
      default: Todo,
      a: Login
    }, */
    // 路由的异步加载。可以在首次请求时，不用全部加载组件，速度更快，等要进入某个路由时，再加载组件
    // router+webpack的实现  使用这个方法时，需要添加依赖包‘babel-plugin-syntax-dynamic-import’
    // 注： 还需要在.babelrc文件中的“plugins”中配置"syntax-dynamic-import"
    component: () => import('../views/todo/todo.vue'),
    // component: Todo,
    name: 'app',
    // meta里面一般存储的时一些源信息，方便SEO（搜索引擎）搜索
    meta: {
      title: 'this is app',
      description: 'asdasd'
    },
    // 在这里也可以配置路由钩子
    // 这个钩子是在进入到这个路由时执行，在router导航卫士的beforeEach和beforeResolve钩子之间执行
    beforeEnter (to, from, next) {
      console.log('app route befroe enter')
      next()
    },
    // 路由的子路由
    children: [
      {
        path: 'test',
        componemt: () => import('../views/login/login.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
