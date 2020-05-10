/*
 * @Author: markHuo 
 * @Date: 2020-05-05 09:10:01 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-10 14:56:53
 */
'use strict';
let _mm = require('util/mm.js');
let _user = {
  // 用户登录
  login: function(userInfo, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/login.do'),
      method: 'post',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 检查用户名
  checkUsername: function(username, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/check_valid.do'),
      method: 'post',
      data: {
        type: 'username',
        str: username
      },
      success: resolve,
      error: reject
    })
  },
  // 用户注册
  register: function(userInfo, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/register.do'),
      method: 'post',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 忘记密码  获取密码提示问题
  getQuestion: function(username, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/forget_get_question.do'),
      method: 'post',
      data: {
        username: username
      },
      success: resolve,
      error: reject
    })
  },
  // 检查密码提示问题答案
  checkAnswer: function(userInfo, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      method: 'post',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 修改密码 提交新密码
  resetPassword: function(userInfo, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      method: 'post',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 获取登陆用户的用户信息
  getUserInfo: function(resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/get_information.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  // 更新个人信息
  updateUserInfo: function(userInfo, resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/update_information.do'),
      method: 'post',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 登录状态下更新密码
  updatePassword : function(userInfo, resolve, reject){
    _mm.request({
        url     : _mm.getServerUrl('/user/reset_password.do'),
        method  : 'POST',
        data    : userInfo,
        success : resolve,
        error   : reject
    });
  },
  // 检查登录状态
  checkLogin: function(resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  // 退出登陆
  logout: function(resolve, reject){
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  }
}
module.exports = _user;