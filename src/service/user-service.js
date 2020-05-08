/*
 * @Author: markHuo 
 * @Date: 2020-05-05 09:10:01 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-05 09:32:20
 */
'use strict';
let _mm = require('util/mm.js');
let _user = {
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