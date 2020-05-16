const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// h获取HtmlWebpackPlugin参数的方法
let getHtmlConfig = function(name, title){
  return {
    template: path.join(__dirname,'../src/view/' + name + '.html'),
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

module.exports = {
  entry: {
    common: path.join(__dirname,'../src/page/common/index.js'),
    index: path.join(__dirname,'../src/page/index/index.js'),
    list: path.join(__dirname,'../src/page/list/index.js'),
    detail: path.join(__dirname,'../src/page/detail/index.js'),
    cart: path.join(__dirname,'../src/page/cart/index.js'),
    'user-login': path.join(__dirname,'../src/page/user-login/index.js'),
    'user-register': path.join(__dirname,'../src/page/user-register/index.js'),
    'user-pass-reset': path.join(__dirname,'../src/page/user-pass-reset/index.js'),
    'user-center': path.join(__dirname,'../src/page/user-center/index.js'),
    'user-center-update': path.join(__dirname,'../src/page/user-center-update/index.js'),
    'user-pass-update': path.join(__dirname,'../src/page/user-pass-update/index.js'),
    result: path.join(__dirname,'../src/page/result/index.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|otf|svg)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:8].[ext]',
              // 在html里的img的src属性添加require会加载不了图片，file-loader新版本默认使用了esModule语法，造成了引用图片文件时的方式和以前的版本不一样,
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.string$/,
        use: [
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ],
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, '../node_modules'),
      util: path.resolve(__dirname, '../src/util'),
      page: path.resolve(__dirname, '../src/page'),
      service: path.resolve(__dirname, '../src/service'),
      image: path.resolve(__dirname, '../src/image'),
    }
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  optimization: {
    //   独立、通用模块到base.js里
    splitChunks: {
      chunks: 'all',
      name: 'base',
      minChunks: 1
    }
  }
}