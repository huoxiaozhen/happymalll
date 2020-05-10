/*
 * @Author: markHuo 
 * @Date: 2020-05-10 13:03:44 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-10 14:02:42
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');
let templateIndex = require('./index.string');

// page 逻辑部分
let page = {
  init: function(){
    this.onLoad();
  },
  onLoad: function(){
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    });
    // 加载用户信息
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo: function(){
    let userHtml = '';
    _user.getUserInfo(function(res){
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg){
      _mm.errorTips(errMsg);
    })
  }
};
$(function(){
  page.init();
})