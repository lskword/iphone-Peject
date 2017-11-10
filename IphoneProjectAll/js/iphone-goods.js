var oLis = document.querySelectorAll('header ul li');
var oDl = document.querySelector('#carousel dl');
var oDd = document.querySelectorAll('#carousel dl dd');
var index = 0;
var idx = 1;
var goods_id=$.getQueryString('goods_id');
var cat_id=$.getQueryString('cat_id');
var search_text=$.getQueryString('search_text');
oLis.forEach(function(item) {
  (function(idx) {
    item.addEventListener("touchstart",function() {
      for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = '';
      }
      this.className = 'xuanzhong';
      oDl.style.left = ((-idx + 1) * 100) + '%';
    },false);
  }(idx));
  idx++;
});

var btnrg=document.querySelector(".miccomment li button");
var li=document.querySelector(".miccomment li");
var ul=document.querySelector(".miccomment");
var textarea=document.querySelector(".commentary");
function release(){


    var newli=document.createElement("li");
    newli.innerText=textarea.value+"\n"+new Date();
    newli.style.paddingTop="0.966183rem";
    newli.style.paddingBottom="0.966183rem";
    if(newli==ul.children[2]){
        ul.appendChild(newli);
    }else{
        ul.insertBefore(newli,ul.children[2]);
    }
    textarea.value="";
}
btnrg.addEventListener("touchstart",release);

var appindex;
var dedown=document.querySelector(".decrease");
var inup=document.querySelector(".increase");
var input=document.querySelector(".movenumber");
appindex=parseInt(input.value);
dedown.addEventListener("touchstart",function(){
    appindex=parseInt(input.value);
    appindex--;
    if(appindex<0){
        appindex=0;
    }
    input.value=appindex;
});
inup.addEventListener("touchstart",function(){
    appindex=parseInt(input.value);
    appindex++;
    if(appindex>100){
        appindex=100;
    }
    input.value=appindex;
});
var cart_id=$.getQueryString('cart_id');
if(cart_id!==null){
	window.shop.api.fetchGoodsListByCatId(cart_id,1,20,function (json) {
    // console.log(json);
    var data = json.data;
    //是每一次都添加元素到页面上性能好还是组装好所有的内容之后一次性插入性能好
    //每次都添加，页面会渲染多次
    var str = '';
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        str += `<div class="clearlinebox"><a href="iphone-goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}" alt=""></a></div>
            <p class="shoptitla">${obj.goods_name}</p>
            <p class="shopprice">
              <sapn class="chunit">￥</sapn>
              <sapn>${obj.price}</sapn>
            </p>`
    }
    $('.shoprecommend').html(str);
});
}else if(cart_id===null){
  window.shop.api.hotshop(function (json) {
    // console.log(json);
    var data = json.data;
    //是每一次都添加元素到页面上性能好还是组装好所有的内容之后一次性插入性能好
    //每次都添加，页面会渲染多次
    var str = '';
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        str += `<div class="clearlinebox"><a href="iphone-goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}" alt=""></a></div>
            <p class="shoptitla">${obj.goods_name}</p>
            <p class="shopprice">
              <sapn class="chunit">￥</sapn>
              <sapn>${obj.price}</sapn>
            </p>`
    }
    $('.shoprecommend').html(str);
});
}
window.shop.api.fetchGoodsDetail(goods_id,function(json){
    // console.log(json);
    // var json=JSON.parse(json);
    // var data = json.data;
    //是每一次都添加元素到页面上性能好还是组装好所有的内容之后一次性插入性能好
    //每次都添加，页面会渲染多次
    var str = '';
        var obj = json.data[0];
        console.log(obj);
        str += `<div class="goodspicture">
          <a href="#"><img src="${obj.goods_thumb}" alt=""></a>
        </div>
        <div class="goodstitle">
          ${obj.goods_name}
        </div>
        <div class="goodsprice">
          <div class="realprice">
            <span class="chd">
              <i class="pricesymbol">￥</i>
              <span class="infoprice">${obj.price}</span>
            </span>
            <span class="icontext">促销价</span>
          </div>
          <div class="itemprice">
            <label>价格:</label>
            <del>￥${parseInt(obj.price)+100}</del>
          </div>
        </div>
        <div class="moduleadds">
          <span>快递: 0.00</span>
          <span>月销量 ${obj.price*100-1234}件</span>
          <span>四川内江</span>
        </div>
        <div class="gap"></div>
        <div class="activity">
          <div class="minibox">
            <div class="icbox">
              <span>促销</span>
            </div>
            <div class="cell">
              <span>满99元,享部分地区包邮</span>
            </div>
          </div>
          <div class="minibox">
            <div class="icbox">
              <span>积分</span>
            </div>
            <div class="cell">
              <span>购买可得16积分</span>
            </div>
          </div>
          <div class="dot"></div>
        </div>
        <div class="sceneitem">
          <ul>
            <li>破损包退</li>
            <li>正品保证</li>
            <li>七天退换</li>
            <li>极速退款</li>
            <li>赠运费险</li>
          </ul>
          <div class="dot" style="right:0.531400rem;"></div>
        </div>`;
    $('.realgoods').html(str);
});

window.shop.api.fetchGoodsDetail(goods_id,function(json){
    var obj=json.data[0];
    // console.log(obj);
    $('.skuimgwrap img').attr('src',obj.goods_thumb);
    $('.skuprice').text('￥'+obj.price);
    $('.stock').text('库存'+((obj.price*100)-321)+'件');
});

$('.visiblemodal').on('touchstart',function(){
    if (!localStorage.token) {
        toasts('要先登录，才能购买哦！');
        $(".promptmodals").show();
        //把当前商品的详细地址存储到localStorage.backurl
        localStorage.backurl = location.href;
        //跳转到登录页
        var timers=setTimeout(function(){
            location.href = "login.html";
        },3000);
        return;
    }
    function toasts(str) {
        var oPrompt=document.createElement('div');
        document.body.appendChild(oPrompt);
        // console.log(oPrompt);

        oPrompt.className
            ='promptmodals';
        oPrompt.innerHTML+=`<div class="promptmodalbox">
      <p class="promptword">
        ${str}
      </p>
    </div>`;
    }
    $('.footmodal').fadeIn(100);
});

$('.modalcloss').on('touchstart',function(){

    $('.footmodal').hide(1000);
});

$(".skubuy").on('touchstart',function(){
  localStorage.backurl=location.href;
    window.shop.api.updateCart(goods_id,appindex,function(json){
        // console.log(goods_id,appindex,json);
    });
    $('.footmodal').hide(1000);
    $('.promptmodal').fadeIn(2000);
    setTimeout($('.promptmodal').hide(1000),2000);
});
