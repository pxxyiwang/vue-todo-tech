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
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    // store模块化
    modules: {
      a: {
        // 在store中，默认store里面的方法名有且只有一个，不能有相同的。这个属性为true时，表示不同模块之间的方法名可以一样，在组件内调用的时候，区分就好了。
        nameSpaced: true,
        state: {
          text: 1
        },
        mutations: {
          // 模块里面的方法的参数state表示的不是全局的，而是该模块内的state
          updateText (state, text) {
            console.lgo('a=' + state)
            state.text = text
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        mutations: {
          updateText (state, text) {
            console.lgo('b=' + state)
            state.text = text
          }
        }
      }
    }
  })
}
