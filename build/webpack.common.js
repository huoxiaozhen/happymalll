const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// h获取HtmlWebpackPlugin参数的方法
let getHtmlConfig = function(name){
  return {
    template: path.join(__dirname,'../src/view/' + name + '.html'),
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

module.exports = {
  entry: {
    index: path.join(__dirname,'../src/page/index.js'),
    login: path.join(__dirname,'../src/page/login.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|otf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ],
  externals : {
    'jquery' : 'window.jQuery'
  },
  optimization: {
    //   独立、通用模块到base.js里
    splitChunks: {
      chunks: 'all',
      name: 'common',
      minChunks: 1
    }
  }
}