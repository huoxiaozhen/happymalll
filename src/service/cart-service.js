/*
 * @Author: markHuo 
 * @Date: 2020-05-05 09:37:37 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-05 09:45:32
 */
'use strict';
let _mm = require('util/mm.js');
let _cart = {
  // 获取购物车数量
  getCartCount: function(resolve,reject){
    _mm.request({
      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    })
  }
};
module.exports = _cart;