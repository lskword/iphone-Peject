$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
  return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
    return dictionObj[$1];
  });
};
//判断当前用户已登录则显示用户名，否则显示登录注册
if (localStorage.getItem('token')) {
  $('.header').html(localStorage.getItem('username')+'<span id="logout">退出</span>');
  $('#logout').click(function(){
    localStorage.clear();
    location.reload();
  });
}
//获取一个商品的DOM元素
function fetchGoodsDom(obj) {
  var oLi = document.createElement('li');
  var oA = document.createElement('a');
  oA.href = 'detail.html?goods_id=' + obj.goods_id;
  oLi.appendChild(oA);
  var oImage = document.createElement('img');
  oImage.src = obj.goods_thumb;
  var oP = document.createElement('p');
  oP.innerText = obj.goods_name;
  var oEm = document.createElement('em');
  oEm.innerText = "售价：" + obj.price;
  oA.appendChild(oImage);
  oA.appendChild(oP);
  oA.appendChild(oEm);
  return oLi;
}

//fetch 获取  goods 商品 category分类 detail详情 config配置
window.shop = {
  config: {
    // 固定地址栏前面的地址内容
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    // 页面的数量
    PAGESIZE: 10,
    // token值储存
    USER_TOKEN: 'token',
    CART_PREFIX: 'cart_',//在本地存储商品ID和对应数量的时候使用
  },
  base: {
    storage: {
      // 存储名字对应值、比localStorage.name要灵活些
      "setItem": function(k, v) {
        return localStorage.setItem(k, v);
      },
      "getItem": function(k) {
        return localStorage.getItem(k);
      }
    },
    business: {
      // 获取token值
      "getToken": function() {
        return shop.base.storage.getItem(shop.config.USER_TOKEN);
      },
      // 获取token值+goods_id拼接，传参number
      "saveGoodsInfoOfCart": function(goods_id, number) {
        return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
      }
    }
  },
  api: {
    fetchGoodsCategory: function(callback){
      // $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
      $.ajax({
        //将URL进行拼接
        url: shop.config.API_PREFIX + 'api_cat.php?format=jsonp',
        //数据类型为jsonp
        dataType: 'jsonp',
        jsonpCallback: "getCategory",
        success: callback
      });
    },
    //获取cart_Id 数量 第几页面
    fetchGoodsListByCatId: function(cat_id, page, pagesize, callback){
      var data = {
        "cat_id": cat_id,
        "page": page,
        "pagesize": pagesize
      };
      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    },
    //获取goods_id
    fetchGoodsDetail: function(goods_id, callback) {
      $.get(shop.config.API_PREFIX + 'api_goods.php?goods_id='+goods_id, callback, 'json');
    },
    //请求数据第几页，每一页有几个内容
    fetchHotGoods: function(page, pagesize, callback){
      $.get(shop.config.API_PREFIX + 'api_goods.php?page='+page+'&pagesize='+pagesize, callback, 'json');
    },
    //搜索商品跳转
    searchGoods: function(opts){
      var data = {};
      data.search_text = opts.search_text;
      data.page = opts.page || 1;
      data.pagesize = opts.pagesize || shop.config.PAGESIZE;
      var callback = opts.callback;

      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    },
    // 账号检测
    checkUsernameUnique: function(username, callback) {
      var data = {
        "status": "check",
        "username": username
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
      //注册
    register: function(username, password, callback){
      var data = {
        "status": "register",
        "username": username,
        "password": password
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
    //登录
    login: function(username, password, callback){
      var data = {
        "status": "login",
        "username": username,
        "password": password
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
    // 获取用户商品详情和数量，自定义传参
    updateCart: function(goods_id, number, callback) {
      var data = {
        "goods_id": goods_id,
        "number": number
      };
      $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
    },
    // 获取用户商品详情和数量
    fetchCart: function(callback){
      $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
    fetchUserAddress: function(callback) {
      $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
    // 添加收货地址
    addUserAddress: function(data, callback){
      $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
    },
    //删除收货地址
    delteUserAddress: function(){
      $.get(shop.config.API_PREFIX+'api_useraddress.php?token='+shop.base.business.getToken() + '&status=delete', data, callback, 'json');
    },
    //编辑用户地址
    editUserAddress: function(){ },//:TODO
    fetchOrder: function(callback){//获取当前用户的订单列表
      $.get(shop.config.API_PREFIX + 'api_order.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
    updateCartInfo:function(goods_id, number, callback) {
      var data={
        goods_id:goods_id,
        number:number
      };
      $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken() , data, callback, 'json');
    },
    //下订单
    addOrder: function(address_id, total_prices, callback){
      var data = {
        "address_id": address_id,
        "total_prices": total_prices
      };
      $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken()+'&status=add', data, callback, 'json');
    },
    cancelOrder: function(){

    },
      //热门商品
      hotshop:function (callback) {
          $.get(shop.config.API_PREFIX+'api_goods.php', callback, 'json');
      }
  }
};

//获取商品分类
// shop.api.fetchGoodsCategory(function(response){
//     var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
//     //处理返回的数据
//     for (var i = 0; i < response.data.length; i++) {
//       var obj = response.data[i];
//       $('#nav-list').append('<li><a href="list.html?cat_id=' + obj.cat_id + '">' + obj.cat_name + '</a></li>');
//     }
// });

//添加搜索功能
var searchBtn = $("#search-btn");
if (searchBtn.length === 1) {
  searchBtn.click(function(){
    location.href = 'search.html?search_text=' + $("#search-text").val();
  });
}

// //更新购物车的方法
// function updateCartInfo(goods_id, goods_number, callback) {
//   /*
//   shop.api.updateCart(goods_id, goods_number, function(response) {
//     //加入购物车了之后把商品ID和对应的数量存储到本地
//     shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
//     callback(response);
//   });
//   */
// }
