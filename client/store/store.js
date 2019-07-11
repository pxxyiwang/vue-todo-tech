// 注： 每次服务端渲染，都要新生成一个sotre，不然又可能造成内存溢出的问题

import Vuex from 'vuex'

// 引用属性（stoer模块化概念）
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

/* const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // 方法中的state是每一个方法中都能拿到的东西，第二个参数是，在组件中调用这个方法时，传过来的
    updateCount (state, num) {
      state.count = num
    }
  }
})

// 需要在应用入口中引入（index.js）
export default store
 */

/* vuex文档中规定state中的值都在sotre中更改，但是实际上，在组件内部通过调用$store也能修改。
可以通过strict这和属性限制开发者不能在组件内部修改。但时正式环境中不能用这个属性。
所以要做一个判断 */
const isDev = process.env.NOOE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    // 自定义创建vuex的模板插件
    /* plugins: [
      // 模板初始化时，会得到store
      (store) => {
        console.log('my plugin invoked')
      }
    ], */
    // store模块化
    modules: {
      a: {
        // 在store中，默认store里面的方法名有且只有一个，不能有相同的。这个属性为true时，表示不同模块之间的方法名可以一样，在组件内调用的时候，区分就好了。
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          // 模块里面的方法的参数state表示的不是全局的，而是该模块内的state
          updateText (state, text) {
            console.log('a=' + state)
            state.text = text
          }
        },
        getters: {
          /* getter方法里面可以接收三个参数，textPlus（state, getters, rootState）
          state：该模块中的state
          getters：所有的get方法
          rootState：全局的state */
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + rootState.b.text
          }
        },
        actions: {
          /* app(ctx) actions方法的第一个参数，拿到的是整个a模块对象。
          也可以这样直接写 app ({state, commit, rootState})，其中{state, commit, rootState} = ctx。
          commit('updateText', '0000000')拿到的是a模块中的commit（mutations）方法。
          commit('b/updateText', '0000000', { root: true})拿到的是b模块中的commit（mutations）方法
          commit('updateCount', { num: '0000000' }, { root: true })拿到的是全局中的commit（mutations）方法
          注： 1.要拿到除了自己本模块中的mutations方法，要加参数{ root: true }。
               2.这里的commit方法，第二参数的类型要根据拿到的mutations方法中转递的参数类型决定的
           */
          app ({state, commit, rootState}) {
            commit('updateText', 'aaaaaa')
            commit('b/updateText', 'bbbbbbb', { root: true })
            commit('updateCount', { num: 8888 }, { root: true })
          }
        }
      },
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        mutations: {
          updateText (state, text) {
            console.log('b=' + state)
            state.text = text
          }
        }
      }
    }
  })

  // vuex热加载功能的实现
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      // 动态加载加载来的模块
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
