var oUl=document.querySelector('#content ul');
// localStorage.token='cdf761d380ef7aaa641d370b73aed70d';
shop.base.storage.getItem('token');
window.shop.api.fetchCart(function (json) {
  console.log(json);
  var data=json.data;
  for (var i = 0; i < data.length; i++) {
    var obj=data[i];
    oUl.innerHTML+=`
    <li>
        <div class="ct-top">
          <input type="checkbox" name="" value="">
          <span>编辑</span>
        </div>
        <div class="details">
          <img src=${obj.goods_thumb} alt="">
          <dl>
            <dt>${obj.goods_name}</dt>
            <dd>￥${parseFloat(obj.goods_price)+100}</dd>
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
      </li>
    `
  }
var $CheckAll = $('footer .ft-left input[type=checkbox]')[0];
var $Checks = $('#content ul li .ct-top input[type=checkbox]');
var $CartSum = parseInt($('footer .ft-right span b')[0].innerText);
var $CartPrice = $('#content ul li .details dl dd p span b');
$CheckAll.onclick = function() {
$Checks.each(function() {
  $(this)[0].checked = $CheckAll.checked;});
  if ($CheckAll.checked) {
    $Checks.each(function() {
      var $Bprice = parseInt($(this).parent().siblings().find('b')[0].innerText);
      var $Bnumber=parseInt($(this).parent().siblings().find('b')[1].innerText);
      if ($(this)[0].checked) {
        $('footer .ft-right span b')[0].innerText = ($CartSum += ($Bprice*$Bnumber));
      }
    });
    return;
  } else {
    $CartSum = $('footer .ft-right span b')[0].innerText = 0;
  }
};

var $Amend = $('#content ul li .ct-top span');
$Amend.each(function() {
  var $ShopnumOl = $(this).parent().siblings().find('ol li p')[0];
  var $ShopnumOlSub = $(this).parent().siblings().find('ol li span:eq(0)');
  var $ShopnumOlPlus = $(this).parent().siblings().find('ol li span:eq(1)');
  $ShopnumOlSub.on('touchstart', function() {
    if (parseInt($ShopnumOl.innerText)===1) {
    $ShopnumOl.innerText= 1;
    }else{
      $ShopnumOl.innerText =
      parseInt($ShopnumOl.innerText) - 1;
    }
  });
  $ShopnumOlPlus.on('touchstart', function() {
    $ShopnumOl.innerText = parseInt($ShopnumOl.innerText) + 1;
  });
  var IphoneCartIndex = 0;
  $(this).on('touchstart', function() {
    var $pDel = $(this).parent().siblings().find('p.del');
    $pDel.on('touchstart',function () {
        $('.prompt').show();
        var $Yes=$('.prompt .prompts button:nth-child(2)');
        $Yes.on('touchstart',function () {
          $(this).parent().parent().hide();
        });
        var $No=$('.prompt .prompts button:nth-child(3)');
        $No.on('touchstart',function () {
          $(this).parent().parent().hide();
        });
    });
    IphoneCartIndex = IphoneCartIndex == 0 ? 1 : 0;
    var $Dl = $(this).parent().siblings().find('dl');
    var $Ol = $(this).parent().siblings().find('ol');
    var $Shopnum = $(this).parent().siblings().find('b')[1];
    if (IphoneCartIndex === 1) {
      $(this).html('完成');
      $Dl.hide();
      $Ol.show();
      $pDel.addClass('deltepcss');
      $pDel.html('删除');
      $ShopnumOl.innerText = parseInt($Shopnum.innerText);

    } else if (IphoneCartIndex === 0) {
      $(this).html('编辑');
      $Dl.show();
      $Ol.hide();
      $pDel.removeClass('deltepcss');
      $pDel.html(' ');
      $Shopnum.innerText = parseInt($ShopnumOl.innerText);
    }
  });
});
$Checks.each(function() {
  $(this)[0].onclick = function() {
    var $Bprice = parseInt($(this).parent().siblings().find('b')[0].innerText);
    var $Bnumber=parseInt($(this).parent().siblings().find('b')[1].innerText);
    // console.log($Bnumber);
    if ($(this)[0].checked) {
      $('footer .ft-right span b')[0].innerText = ($CartSum += ($Bprice*$Bnumber));
    } else if(!$(this)[0].checked) {
      $('footer .ft-right span b')[0].innerText = ($CartSum -= ($Bprice*$Bnumber));
    }
  };
});

function getCartSum() {
  var sum = 0;
    $CartPrice.each(function () {
      sum+= (parseInt($(this)[0].innerText));
    });
  return sum;
}
});
