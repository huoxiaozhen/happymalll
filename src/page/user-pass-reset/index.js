/*
 * @Author: markHuo 
 * @Date: 2020-05-10 09:19:41 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-10 13:58:21
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');
// 表单里的错误提示
let formError = {
  show: function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function(){
    $('.error-item').hide().find('.err-msg').text('');
  }
}
let page = {
  data: {
    username: '',
    question: '',
    answer  : '',
    token   : ''
  },
  init: function(){
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function(){
    this.loadStepUsername();
  },
  bindEvent: function(){
    let _this = this;
    // 输入用户名后的下一步点击
    $('#submit-username').click(function(){
      let username = $.trim($('#username').val());
      // 用户名存在
      if(username){
        _user.getQuestion(username, function(res){
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
        }, function(errMsg){
          formError.show(errMsg);
        });
      }else{
        // 用户名不存在
        formError.show('请输入用户名');
      }
    });
    // 输入提示问题答案后的下一步点击
    $('#submit-question').click(function(){
      let answer = $.trim($('#answer').val());
      // 答案存在
      if(answer){
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function(res){
          _this.data.answer= answer;
          _this.data.token= res;
          _this.loadStepPassword();
        }, function(errMsg){
          formError.show(errMsg);
        })
      }else{
        formError.show('请输入密码提示问题答案');
      }
    });
    // 输入新密码后的按钮点击
    $('#submit-password').click(function(){
      let password = $.trim($('#password').val());
      // 密码不为空
      if(password && password.length >=6){
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function(res){
          window.location.href = './result.html?type=pass-reset';
        }, function(errMsg){
          formError.show(errMsg);
        })
      }else{
        formError.show('请输入不少于6位的新密码');
      }
    })
  },
  //  加载输入用户名的一步
  loadStepUsername: function(){
    $('.step-username').show();
  },
  //  加载输入密码 提示问题答案的一步
  loadStepQuestion: function(){
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question);
  },
  //  加载输入password的 一步
  loadStepPassword: function(){
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-question').hide()
      .siblings('.step-password').show();
  }
};
$(function(){
  page.init();
})