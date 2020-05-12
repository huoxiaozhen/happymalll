/*
 * @Author: markHuo 
 * @Date: 2020-05-11 21:28:02 
 * @Last Modified by: markHuo
 * @Last Modified time: 2020-05-12 21:13:34
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

let page = {
  data: {
    listParam: {
      keyword: _mm.getUrlParam('keyword') || '',
      categoryId: _mm.getUrlParam('categoryId') || '',
      orderBy: _mm.getUrlParam('orderBy') || 'default',
      pageNum: _mm.getUrlParam('pageNum') || '',
      pageSize: _mm.getUrlParam('pageSize') || 20
    }
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    this.loadList();
  },
  bindEvent: function () {
    let _this = this;
    // 排序的点击
    $('.sort-item').click(function () {
      let $this = $(this);
      _this.data.listParam.pageNum = 1;
      // 点击默认排序 
      if ($this.data('type') === 'default') {
        // 已经是active样式
        if ($this.hasClass('active')) {
          return;
        } else {
          // 其他
          $this.addClass('active').siblings('.sort-item')
            .removeClass('active asc desc');
          _this.data.listParam.orderBy = 'default';
        }
      }
      // 点击价格排序
      else if ($this.data('type') === 'price') {
        $this.addClass('active').siblings('.sort-item')
          .removeClass('active asc desc');
        if (!$this.hasClass('asc')) {
          $this.addClass('asc').removeClass('desc');
          _this.data.listParam.orderBy = 'price_asc';
        } else {
          $this.addClass('desc').removeClass('asc');
          _this.data.listParam.orderBy = 'price_desc';
        }
      }
      // 重新加载列表
      _this.loadList();
    })
  },
  // 加载list数据
  loadList: function () {
    let _this = this;
    let listHtml = '';
    let listParam = this.data.listParam;
    let $pListCon = $('.p-list-con');
    // 加载loading图标
    $pListCon.html('<div class="loading"></div>');
    // 删除参数中不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    // 请求接口
    _product.getProductList(listParam, function (res) {
      listHtml = _mm.renderHtml(templateIndex, {
        list: res.list
      });
      $pListCon.html(listHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage, // 是不是有前一页，当前是第一页时候就是false了
        prePage: res.prePage, //前一页的页码
        hasNextPage: res.hasNextPage, //是不是有后一页，当前是最后一页时候就是false了
        nextPage: res.nextPage, // 后一页的页码
        pageNum: res.pageNum, // 当前页码号
        pages: res.pages // 总共有多少页
      });
    }, function (errMsg) {
      _mm.errorTips(errMsg);
    })
  },
  // 加载分页信息
  loadPagination: function (pageInfo) {
    var _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function (pageNum) {
        _this.data.listParam.pageNum = pageNum;
        _this.loadList();
      }
    }));
  }
};
$(function () {
  page.init();
})