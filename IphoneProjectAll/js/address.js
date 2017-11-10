/**
 * Created by lx on 2017/9/14.
 */
//var oShowAllAddress = document.querySelector('.show-all-address');
//oShowAllAddress.addEventListener('click', function(){
//  var oAddressUl = document.querySelector('.address-ul');
//  var overflow = fetchComputedStyle(oAddressUl, 'overflow');
//  var flag = overflow === 'hidden' ? false : true;
//  oAddressUl.style.overflow = !flag ? 'visible' : 'hidden';
//  this.innerText = flag ? '显示全部地址' : '隐藏地址';
//});
function showAddress() {
    myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php',
        {token: localStorage.token},
        function(error, responseText) {
            var json = JSON.parse(responseText);
            console.log(json);
            var data = json.data;
            var oAddressUl = document.querySelector('.new-address');
            if (data.length === 0) {
                oAddressUl.innerHTML = '<h2>您还没有收货地址，请点击添加收货地址</h2>';
                return;
            }
            oAddressUl.innerHTML = '';
            for (var i = data.length - 1; i >= 0; i--) {
                var obj = data[i];
                oAddressUl.innerHTML += `
                            <li data-id="${obj.address_id}">
                              <span class="information">收货人：${obj.consignee}</span><span name="delete" class="delete" data-id="${obj.address_id}">删除</span>
                              <span class="information">手机：${obj.mobile}</span>
                              <span class="information">地址：${obj.address}</span>
                            </li>
            `;
            }
        })
}
showAddress();

var selected_address_id = 0;//如果这个值为0，无法下订单，当点击一个收货地址时，给这个变量赋值
//给收货地址添加一个事件代理
var oAddressUl = document.querySelector('.address-ul');
oAddressUl.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    console.log(target.nodeName);
    if (target.className === 'delete') {
        toasts('删除地址成功');
        setTimeout(function () {
          var oPrompt=document.querySelector('#oprompts');
          // console.log(oPrompt);
          document.body.removeChild(oPrompt);
        },2000);
        var address_id = target.dataset.id;
        myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php',
            {status: 'delete', address_id, token: localStorage.token}, function(error, responseText){
                var json = JSON.parse(responseText);
                if (json.code === 0) {
                    target.parentNode.parentNode.removeChild(target.parentNode);
                }
            })
    } else {
        //先让所有li元素的样式清空
        var oAddressLis = oAddressUl.querySelectorAll('li');
        for (var i = 0; i < oAddressLis.length; i++) {
            oAddressLis[i].classList.remove('selected');
        }

        if (target.nodeName === 'LI') {
            //点击LI元素选择一个收货地址
            selected_address_id = parseInt(target.dataset.id);
            target.classList.add('selected');
        } else if (target.nodeName === 'SPAN'){
            selected_address_id = parseInt(target.parentNode.dataset.id);
            target.parentNode.classList.add('selected');
        }

    }
};
var oOrder = document.querySelector('#order');
oOrder.onclick = function() {
    var address_id = selected_address_id;
    if (address_id === 0) {
        toasts('请选择一个收货地址');
        setTimeout(function(){
          var oPrompt=document.querySelector('#oprompts');
          document.body.removeChild(oPrompt);
        },2000)

        return;
    }
    var total_prices = localStorage.sum;
    myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=add', {address_id, total_prices}, function(err, responseText){
        var json = JSON.parse(responseText);
        console.log(json);
        if (json.code === 0) {
            toasts('下订单成功');
            setTimeout(function(){
              location.href = 'order.html';
            },2000)
        }else if(json.code===2002){
          var fun1=function () {
            location.href='index.html';
          }
          var fun2=function () {
            location.href='hotshop.html';
          }
          var oOrder=document.querySelector('#order');

          Prompts('亲，购物车没有东西哦！',fun1,fun2,oOrder);
          console.log(oOrder);
        }

    });

};
var modal = new Modal('#add-address');

//给添加按钮添加事件
var oAdd = document.querySelector('.add');
oAdd.onclick = function() {
    var postobj = serializeForm(document.querySelector('.addressform'));
    myajax.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token='+localStorage.token, postobj, function(err, responseText){
        var json = JSON.parse(responseText);
        console.log(json);
        if (json.code === 0) {
            modal.hide();
            showAddress();
        }
    });
};
function Prompts(str,fun1,fun2) {
// var oBtn=document.querySelector('button');
// oPromptDiv.addEventListener('click',function(event){
  event=event||window.event;
  var oPromptDiv=document.createElement('div');
  document.body.appendChild(oPromptDiv);
  oPromptDiv.id='oprompts'
  oPromptDiv.innerHTML=`
              <p>'${str}'</p>
              <button id="confirm">去热门商品看看</button>
              <button id='cancel'>返回首页</button>
                `
    var oConfirm=document.querySelector('#confirm');
    var oCancel=document.querySelector('#cancel');
    oCancel.onclick=function () {
      document.body.removeChild(oPromptDiv);
      fun1();
    };
    oConfirm.onclick=function () {
      document.body.removeChild(oPromptDiv);
      fun2();
    };
  // });
}
