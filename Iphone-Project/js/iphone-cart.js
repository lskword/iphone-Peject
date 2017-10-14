var oUl = document.querySelector('#content ul');
//
var $CartNumber = parseInt($('header .title span.cart-number')[0].innerText);
// localStorage.token='cdf761d380ef7aaa641d370b73aed70d';
shop.base.storage.getItem('token');
window.shop.api.fetchCart(function(json) {
  if (!localStorage.token) {
      oUl.innerHTML = `<h3>
      <img src='images/cart.png' style='width: 6rem;'>
      <p>您还没有登录</p>
      <p>3s后跳转到登录页面....</p>
      </h3>`;
      setTimeout(function () {
      location.href='login.html';
    },3000);
      return;
  }
  // console.log(json);
  var data = json.data;
  $('header .title span.cart-number')[0].innerText = (data.length) + $CartNumber;
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    oUl.innerHTML += `<li>
        <div class="ct-top">
          <input type="checkbox" name="" value="">
          <span>编辑</span>
        </div>
        <div class="details">
          <img src=${obj.goods_thumb} alt="">
          <dl>
            <dt>${obj.goods_name}</dt>
            <dd>${obj.goods_id}已售</dd>
            <dd>
              <p>
                <span>
                  ￥<b>${obj.goods_price}</b>
                </span>
                <span>
                  x
                  <b>${obj.goods_number}</b>
                </span>
              </p>
            </dd>
          </dl>
          <ol>
            <li>
              ${obj.goods_name}
            </li>
            <li>
              <span>-</span>
              <p>4</p>
              <span>+</span>
            </li>
          </ol>
          <p class="del"></p>
        </div>
      </li>`;
  }
  var $CheckAll = $('footer .ft-left input[type=checkbox]')[0];
  var $Checks = $('#content ul li .ct-top input[type=checkbox]');
  var $CartSum = parseInt($('footer .ft-right span b')[0].innerText);
  var $CartPrice = $('#content ul li .details dl dd p span b');
  $CheckAll.onclick = function() {
    $Checks.each(function() {
      $(this)[0].checked = $CheckAll.checked;
    });
    if ($CheckAll.checked) {
      $CartSum = 0;
      $Checks.each(function() {
        var $Bprice = parseInt($(this).parent().siblings().find('b')[0].innerText);
        var $Bnumber = parseInt($(this).parent().siblings().find('b')[1].innerText);
        if ($(this)[0].checked) {
          $('footer .ft-right span b')[0].innerText = ($CartSum += ($Bprice * $Bnumber));
        }
      });
    } else {
      $CartSum = $('footer .ft-right span b')[0].innerText = 0;
    }
  };
  var oInputs = document.querySelectorAll('#content ul li .ct-top input');
  $Checks.each(function() {
    $(this)[0].onclick=function() {
      window.$Bprice = parseInt($(this).parent().siblings().find('b')[0].innerText);
      window.$Bnumber = parseInt($(this).parent().siblings().find('b')[1].innerText);
      if ($(this)[0].checked) {
        $('footer .ft-right span b')[0].innerText = ($CartSum += ($Bprice * $Bnumber));
      } else if (!$(this)[0].checked) {
        var indexoInput = 0;
        for (var i = 0; i < data.length; i++) {
          if (oInputs[i].checked === false) {
            indexoInput += 1;
          }
        }
        // console.log(indexoInput);
        if (indexoInput === data.length) {
          $('footer .ft-left input[type=checkbox]')[0].checked = false;
        }
        $('footer .ft-right span b')[0].innerText = ($CartSum -= ($Bprice * $Bnumber));
      }
    };
  });
  var $Amend = $('#content ul li .ct-top span');
  $Amend.each(function() {
    var $ShopnumOl = $(this).parent().siblings().find('ol li p')[0];
    var $ShopnumOlSub = $(this).parent().siblings().find('ol li span:eq(0)');
    var $ShopnumOlPlus = $(this).parent().siblings().find('ol li span:eq(1)');
    $ShopnumOlSub.on('touchstart', function() {
      if (parseInt($ShopnumOl.innerText) === 1) {
        $ShopnumOl.innerText = 1;
      } else {
        $ShopnumOl.innerText =
          parseInt($ShopnumOl.innerText) - 1;
      }
    });
    $ShopnumOlPlus.on('touchstart', function() {
      $ShopnumOl.innerText = parseInt($ShopnumOl.innerText) + 1;
    });
    var $pDel = $(this).parent().siblings().find('p.del');
    var self = this;
    var IphoneCartIndex = 0;
    $(this).on('touchstart', function() {
      IphoneCartIndex = IphoneCartIndex == 0 ? 1 : 0;
      var $Dl = $(this).parent().siblings().find('dl');
      var $Ol = $(this).parent().siblings().find('ol');
      var $Shopnum = $(this).parent().siblings().find('b')[1];
      // console.log($Shopnum);
      if (IphoneCartIndex === 1) {
        $(this).html('完成');
        $Dl.hide();
        $Ol.show();
        $pDel.addClass('deltepcss');
        $pDel.html('删除');
        $ShopnumOl.innerText = parseInt($Shopnum.innerText);
        $(this).siblings().hide();
        if ($(this).siblings()[0].checked) {
        $(this).parent().find('input').click();
        } else if (!$(this).siblings()[0].checked) {
        }

      } else if (IphoneCartIndex === 0) {
        $(this).html('编辑');
        $Dl.show();
        $Ol.hide();
        $pDel.removeClass('deltepcss');
        $pDel.html(' ');
        var goods_id =
        parseInt($(this).parent().siblings().find('dl dd:eq(0)')[0].innerText).toString();
        var number = parseInt($ShopnumOl.innerText);
        shop.base.storage.getItem('token');
        shop.api.updateCartInfo(goods_id, number, function(json) {});
        $Shopnum.innerText = parseInt($ShopnumOl.innerText);
        $(this).siblings().show();
      }
    });
    pdel(self);
    function pdel(self) {
      $pDel.on('touchstart', function() {
        $('.prompt').show();
        var $Yes = $('.prompt .prompts button:nth-child(2)');
        var thi = self;
        $Yes.on('touchstart', function() {
          var goods_id =
            parseInt($(thi).parent().siblings().find('dl dd:eq(0)')[0].innerText).toString();
          var number = 0;
          shop.base.storage.getItem('token');
          shop.api.updateCartInfo(goods_id, number, function(json) {
            location.href=location.href;
            if (json.code === 0) {
              $(thi).parent().parent().remove();
            }
          });
          $(this).parent().parent().hide();
        });
        var $No = $('.prompt .prompts button:nth-child(3)');
        $No.on('touchstart', function() {
          $(this).parent().parent().hide();
        });
      });
    }
  });
  var $Black=$('header .black-btn');
  $Black.on('touchstart',function () {
    if (localStorage.backurl) {
      location.href = localStorage.backurl;
    } else {
      location.href = 'index.html';
    }
  });
  function getCartSum() {
    var sum = 0;
    $CartPrice.each(function() {
      sum += (parseInt($(this)[0].innerText));
    });
    return sum;
  }
});
$('.ft-right a.pley').on('touchstart',function () {
  location.href='address.html';
});
