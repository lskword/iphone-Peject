//localStorage.token='c22710c92954544846310d0c52e02482';
localStorage.setItem("token","c22710c92954544846310d0c52e02482");
//window.shop.base.storage.getItem('token');
var page=1;
function add(page){
	window.shop.api.fetchHotGoods(page,20,function(json){
	var data=json.data;
	for(var i=0;i<data.length;i++){
		var obj=data[i];
		$(".search-goods").get(0).innerHTML+=`
		<a href="iphone-goods.html?goods_id=${obj.goods_id}">
		<div class="hot-goods-box">
		<div class="goods-name-box"><div class="goods-name">${obj.goods_name}</div></div>
	        <img class="hot-goods-img" src="${obj.goods_thumb}"/>
			<div class="goods-price"><i>¥</i>${obj.price}</div>
			<div class="goods-number">${obj.goods_id}人付款</div>
			</div></a>
			`
	}
})
}
$(".list li").eq(1).on("click",function(){
	$(".search-goods").get(0).innerHTML="";
	$(".list li a").get(0).style.color="#333";
	$(".list li a").get(1).style.color="red";
	page=5;
	add(page);

})
$(".list li").eq(0).on("click",function(){
	$(".search-goods").get(0).innerHTML="";
	$(".list li a").get(1).style.color="#333";
	$(".list li a").get(0).style.color="red";
	page=1;
	add(page);

})
add(page);
    // 当我们滚动到页面底部的时候 (百分之七十的时候我们就加载更多)
    $(window).scroll(function(){
      var rate = $(document).scrollTop() / $(document).height();
      if (rate > 0.7) {
        page++;
	    add(page);
      }
    });
    $(".get-more").on("click",function(){
    	$(document).scrollTop(0);
    })
    	$(".searchphoto").on("click",function(){
    	var ovalue=$("#search-kuan").get(0).value;
    	event = event || window.event;
        	$(".list").css({"display":"none"});
					window.shop.api.searchGoods({"search_text":ovalue,"pagesize":100,"callback":function(json){
						console.log(json);
						$(".search-goods").get(0).innerHTML=null;
						var data=json.data;
						if(data.length===0){
							$(".search-goods").get(0).innerHTML=`<h2>抱歉,没有您要的商品!<h2>`
						}else{
							for(var i=0;i<data.length;i++){
								var obj=data[i];
								$(".search-goods").get(0).innerHTML+=`
								<a href="iphone-goods.html?goods_id=${obj.goods_id}">
								<div class="hot-goods-box">
								<div class="goods-name-box"><div class="goods-name">${obj.goods_name}</div></div>
							        <img class="hot-goods-img" src="${obj.goods_thumb}"/>
									<div class="goods-price"><i>¥</i>${obj.price}</div>
									<div class="goods-number">${obj.goods_id}人付款</div>
									</div></a>
									`
							}
						}
					}})
    	})
    $("#search-kuan").on("keyup",function(event){
    	var ovalue=$("#search-kuan").get(0).value;
    	console.log(event.keyCode)
    	event = event || window.event;
        if (event.keyCode === 13){
        	$(".list").css({"display":"none"});
					window.shop.api.searchGoods({"search_text":ovalue,"pagesize":100,"callback":function(json){
						console.log(json);
						$(".search-goods").get(0).innerHTML=null;
						var data=json.data;
						if(data.length===0){
							$(".search-goods").get(0).innerHTML=`<h2>抱歉,没有您要的商品!<h2>`
						}else{
							for(var i=0;i<data.length;i++){
								var obj=data[i];
								$(".search-goods").get(0).innerHTML+=`
								<a href="iphone-goods.html?goods_id=${obj.goods_id}">
								<div class="hot-goods-box">
								<div class="goods-name-box"><div class="goods-name">${obj.goods_name}</div></div>
							        <img class="hot-goods-img" src="${obj.goods_thumb}"/>
									<div class="goods-price"><i>¥</i>${obj.price}</div>
									<div class="goods-number">${obj.goods_id}人付款</div>
									</div></a>
									`
							}
						}
					}})
				}
    })
