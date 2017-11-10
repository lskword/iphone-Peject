$('.black-btn').on('touchstart',function () {
  location.href='address.html'});
var oUl=document.querySelector('#order-shop ul');
shop.api.fetchOrder(function (json) {
    console.log(json);
    var data = json.data;
    if (data.length === 0) {
        oUl.innerHTML = `<h3>
        <p>您的订单为空</p>
        <p>3s后跳转到登录页面....</p>
        </h3>`;
        setTimeout(function () {
        location.href='login.html';
      },3000);
        return;
    }
    var toatlPrices=0;
    for (var i = 0; i < data.length; i++) {
        let obj = data[i];
        //遍历商品列表，拼装HTML
        let goodsHTML = '';
        for (let j = 0; j < obj.goods_list.length; j++) {
            let goods = obj.goods_list[j];
            // console.log(goods);
            goodsHTML += `


            <div class="shopxq">
            <a href='iphone-goods.html?goods_id=${goods.goods_id}'
              <div class="shop-content">
                <span>
                  <img src="${goods.goods_thumb}" alt="">
                  保险服务
                </span>
                <span>
                    ${goods.goods_name}
                </span>
                <span>
                  <dl>
                    <dd class="shop-content-price">
                      ￥<b>${goods.goods_price}</b>
                    </dd>
                    <dd >
                      ￥<b>${parseInt(goods.goods_price)+100}</b>
                    </dd>
                    <dd class="shop-content-num">
                      x
                    <b>${goods.goods_number}</b>
                    </dd>
                  </dl>

                </span>
              </div>
              </a>
            </div>

            `
           toatlPrices+=goods.goods_price * goods.goods_number;

        }

        oUl.innerHTML += `
        <li>
        <div class="order-top">

          <div class="topleft">

          </div>
          <div class="topright">
            等待买家付款
          </div>
        </div>
        <div class= 'aderss'>
        <a href='address.html'>
          <p style='
          padding:.3rem;
          width: 100%;
          height: 1rem;
          '>
          <b style='float:left'>收货人:${obj.consignee}</b>
          <b style='
          float:right;
          margin-right: 2.4rem;
          '>${obj.tel}</b>
          </p>
          <span style='margin-left:.3rem;'>
          收货地址:
          </span>
          <span>
          ${obj.city}</span>
          <span>
          ${obj.country}
          </span>
          <span>
          ${obj.district}
          </span>
          <span>
          ${obj.address}
          </span>
          </a>
        </div>
        ${goodsHTML}
        <div class="shop-bottom">
          <span>
            合计：￥
            <b>${toatlPrices}</b>
          </span>
        </div>
        <div class="order-footer">
          <span></span>
          <span ><a href='hotgoods.html'>更多</a></span>
          <span class='cancel-order'>取消订单</span>
          <span class='payment'><a href='payment.html'>付款</a></span>
        </div>
        </li>
        `
        // console.log(toatlPrices);
        $('.payment').on('touchstart',function(){
          var pricesum=parseInt($(this).parent().parent().find('.shop-bottom span b').html());
          var shopname=$(this).parent().parent().find('.shop-content span:eq(1)').html();
          localStorage.shopname='';
          localStorage.shopname=shopname;
          localStorage.toatlPrices=' ';
          localStorage.toatlPrices=pricesum;
        });
        toatlPrices=0;
    }
})
var $oUl=$('#order-shop ul');
$oUl.on('touchstart',function(event) {
    event = event || window.event;
    let target = event.target || event.srcElement;
    if (target.className === 'cancel-order') {
        var fun2=function () {
          let order_id = target.dataset.id;
          // window.shop.api.cancelOrder(order_id,function(json) {
          //     if (json.code === 0) {
                  var oli=target.parentNode.parentNode;
                  // console.log(oli);
                  oli.parentNode.removeChild(oli);
                  toasts('订单取消成功');
                  var oPrompt=document.querySelector('#opromptst');
                  var timesr=setTimeout(function(){
                    // document.body.removeChild(oPrompt);
                    $('#opromptst').fadeOut(2000);
                    setTimeout(function () {
                      $('#opromptst').remove();
                    },1000);
                  },1000);
              // }
          // });
        };
        var fun1=function () {
          return;
        };
        Prompts('确认要取消订单吗',fun1,fun2)
    }
});

function toasts(str) {
  var oPrompt=document.createElement('div');
  document.body.appendChild(oPrompt);
  // console.log(oPrompt);
  oPrompt.id='opromptst';
  oPrompt.innerText=str;
}
function toasts_one(str){
  var oPrompt=document.createElement('div');
  document.body.appendChild(oPrompt);
  console.log(oPrompt);
  oPrompt.id='oprompts';
  oPrompt.innerHTML=`
                    <p>'${str}'</p>
                    <p>
                    <button id='see'><a href='hotshop.html'>再去看看</a></button>
                    <button id='gocart'><a href='cart.html'>前往购物车</a></button>
                    </p>
                    `
}
 function Prompts(str,fun1,fun2) {
	var oPromptDiv=document.createElement('div');
	document.body.appendChild(oPromptDiv);
	oPromptDiv.id='oprompts';
	oPromptDiv.innerHTML=`
              <div class='order-mudol'>
							<p>'${str}'</p>
							<button id="confirm">确定</button>
							<button id='cancel'>取消</button>
							</div>	`
		// var oConfirm=document.querySelector('#confirm');
		// var oCancel=document.querySelector('#cancel');
		  $('#cancel').on('touchstart',function () {
			document.body.removeChild(oPromptDiv);
			fun1();
		  })
		  $('#confirm').on('touchstart',function () {
			document.body.removeChild(oPromptDiv);
			fun2();
		})
}
