const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: 8800,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  // eslint-disable-next-line no-dupe-keys
  devtool: '#cheap-module-eval-source-map',
  devServer,
  // 可以指定(import vue form 'vue')导入的文件来自哪里！
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPluins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
