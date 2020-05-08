/*
 * @Author: markHuo 
 * @Date: 2020-05-04 09:01:08 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-04 15:37:16
 */
'use strict';
// 引入hogan
let Hogan = require('hogan.js');
let conf = {
  serverHost: ''
}
let _mm  = {
  // 网络请求
  request: function (param) {
    let _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res){
        // 请求成功
        if(res.status === 0){
          typeof param.success === 'function' && param.success(res.data, res.msg);
        }else if(res.status === 10){
          // 没有登录状态，需要强制登录
          _this.doLogin();
        }else if(res.status === 1){
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error: function(err){
        typeof param.error === 'function' && param.error(err.statusText);
      }
    })
  },
  // 获取服务器地址
  getServerUrl: function(path){
    return conf.serverHost = path;
  },
  // 获取url参数
  getUrlParam:  function(name){
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 渲染html模板
  renderHtml: function(htmlTemplate,data){
    let template = Hogan.compile(htmlTemplate);
    let result = template.render(data);
    return result;
  },
  // 成功提示
  successTips: function(msg){
    alert(msg || '操作成功');
  },
  // 错误提示
  errorTips: function(msg){
    alert(msg || '哪里不对了吧~');
  },
  // 表单验证,支持非空、手机、邮箱
  validate: function(value, type){
    var value = $.trim(value);
    // 非空验证
    if(type === 'require'){
      return !!value;
    }
    // 手机号验证
    if(type === 'phone'){
      return /^1\{10}$/.test(value);
    }
    // 邮箱格式验证
    if(type === 'email'){
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  // 统一登录处理
  doLogin: function(){
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  goHome: function(){
    window.location.href = './index.html';
  }
};
module.exports = _mm;