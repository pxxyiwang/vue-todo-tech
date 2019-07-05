// const docsLoader = require.resolve('./doc-loader')

/* module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 控制组件中html里面不小心输入的空格
    extractCSS: !isDev, // 在打包（build）的时候，将.vue文件中的css样式打包成一个文件。
    cssModules: {},
    // hotReload: false,   // 根据环境变量生成
    // loaders: {  // 自定义模板，配合loader文件的使用
    //     'docs': docsLoader
    // }
  }
} */

module.exports = isDev => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
    // hotReload:false 根据环境变量热重载
    /* 自定义模块
        loaders: {
          'docs': docsLoader
        }
        */
  }
}
