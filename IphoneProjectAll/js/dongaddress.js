$(".get-address").on("click",function(){
	$(".modal").css({"display":"block"})
})
$(".close").on("click",function(){
	$(".modal").css({"display":"none"})
})
$("#over").on("click",function(){
	$("#rng").css({"display":"none "})
})

var token=localStorage.getItem('token');
// console.log(token);
window.shop.api.fetchUserAddress(function(json){
	var data=json.data;
	if(data.length==0){
		$('.addresses').html("<h2>您还没有收货地址，请添加收货地址^.^</h2>")
	}else{
		for(var i=data.length-1;i>=0;i--){
			var obj=data[i]
			console.log($('.addresses').get(0))
		$('.addresses').get(0).innerHTML+=`
		<div class="addresses-box" data-id="${obj.address_id}">
		<div class="addresses-remove" data-id="${obj.address_id}">删除</div>
		<div class="addresses-man"><b class="a">收货人: ${obj.consignee}</b><span class="a">手机号: ${obj.mobile}<span></div>
		<div class='all-addresses'>详细地址: ${obj.address}</div>
		<div class="icon"><div>
		</div>`
		}

	}
	// console.log(json)
})
$(".add").on('click',function(){
	var postobj = serializeForm($('.addressform').get(0));
	window.shop.api.addUserAddress(postobj,function(json){
		$(".modal").css({"display":"none"});
		location.href="address.html";
	})
});
var selected_address_id = 0;

$(".addresses").on("click",function(event){
	event = event || window.event;
    var target = event.target || event.srcElement;
    var allbiao=document.querySelectorAll(".icon");
//  for(var i=0;i<allbiao.length;i++){
//  	allbiao[i].style.display="none";
//  }
    if (target.className === 'addresses-remove') {
    	var oremove=target.parentNode;
    	$(".addresses").get(0).removeChild(oremove);
    	var address_id = target.dataset.id

;
    	$.ajax({
    		type:"get",
    		url:"http://h6.duchengjiu.top/shop/api_useraddress.php",
    		data:{status: 'delete', address_id, token: localStorage.token},
    		dataType: "json",//JSON, XML, HTML
            success: function (json){
            //  console.log(json);
             }
    	});
    }else if(target.className === 'addresses-box'){
    	var tubiao=target.childNodes[7];
    	if(tubiao.style.display==="none"||tubiao.style.display===""){
      		  for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		tubiao.style.display="block";
    		selected_address_id =target.dataset.id

 ;
//  		oindec=1;
    	}else if(tubiao.style.display==="block"){
    		for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		selected_address_id=0;
//  		oindec=0;
    	}

    	// console.log(tubiao)
			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
    }else if(target.className === 'addresses-man'||target.className === 'all-addresses'||target.className === 'icon'){
    	var tubiao=target.parentNode.childNodes[7];
    	if(tubiao.style.display==="none"||tubiao.style.display===""){
      		  for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		tubiao.style.display="block";
    		selected_address_id =target.parentNode.dataset.id

 ;
//  		oindec=1;
    	}else if(tubiao.style.display==="block"){
    		for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		selected_address_id=0;
//  		oindec=0;
    	}
    	// console.log(this)
			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
    }else if(target.className === 'a'){
    	var tubiao=target.parentNode.parentNode.childNodes[7];
    	if(tubiao.style.display==="none"||tubiao.style.display===""){
      		  for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		tubiao.style.display="block";
    		selected_address_id =target.parentNode.parentNode.dataset.id

 ;
//  		oindec=1;
    	}else if(tubiao.style.display==="block"){
    		for(var i=0;i<allbiao.length;i++){
    	      allbiao[i].style.display="none";
              }
    		selected_address_id=0;
//  		oindec=0;
    	}
			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
    }
    console.log(selected_address_id);
});
// $(".addresses").on("click",function(event){
// 	event = event || window.event;
//     var target = event.target || event.srcElement;
//     var allbiao=document.querySelectorAll(".icon");
//  for(var i=0;i<allbiao.length;i++){
//  	allbiao[i].style.display="none";
//  }
//     if (target.className === 'addresses-remove') {
//     	var oremove=target.parentNode;
//     	$(".addresses").get(0).removeChild(oremove);
//     	var address_id = target.dataset.id;
//     	$.ajax({
//     		type:"get",
//     		url:"http://h6.duchengjiu.top/shop/api_useraddress.php",
//     		data:{status: 'delete', address_id, token: localStorage.token},
//     		dataType: "json",//JSON, XML, HTML
//             success: function (json){
//             //  console.log(json);
//              }
//     	});
//     }else if(target.className === 'addresses-box'){
//     	var tubiao=target.childNodes[7];
//     	if(tubiao.style.display==="none"){
//       		  for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
//               }
// 							console.log(1);
//     		tubiao.style.display="block";
//     		selected_address_id =target.dataset.id ;
// //  		oindec=1;
//     	}else if(tubiao.style.display==="block"){
//     		for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
// 						console.log(2);
//               }
//     		selected_address_id=0;
// //  		oindec=0;
//     	}
//
//     	// console.log(tubiao)
// 			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
//     }else if(target.className === 'addresses-man'||target.className === 'all-addresses'||target.className === 'icon'){
//     	var tubiao=target.parentNode.childNodes[7];
//     	if(tubiao.style.display==="none"){
//       		  for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
//               }
//     		tubiao.style.display="block";
//     		selected_address_id =target.dataset.id
//
//  ;
// //  		oindec=1;
//     	}else{
//     		for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
//               }
//     		selected_address_id=0;
// //  		oindec=0;
//     	}
//     	// console.log(this)
// 			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
//     }else if(target.className === 'a'){
//     	var tubiao=target.parentNode.parentNode.childNodes[7];
//     	if(tubiao.style.display==="none"){
//       		  for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
//               }
//     		tubiao.style.display="block";
//     		selected_address_id =target.dataset.id
//
//  ;
// //  		oindec=1;
//     	}else{
//     		for(var i=0;i<allbiao.length;i++){
//     	      allbiao[i].style.display="none";
//               }
//     		selected_address_id=0;
// //  		oindec=0;
//     	}
// 			// $(target).parent().css('border','1px solid red').siblings().css('border','0');
//     }
// });

 $(".come-order").on('click',function(){
   var address_id = selected_address_id;
    if (address_id === 0) {
        $(".tip-main").html("请选择一个收货地址");
        $("#rng").css({"display":"block"});
    }else{
			// console.log(localStorage.toatlPrices);
			var total_prices=localStorage.toatlPrices;
    	window.shop.api.addOrder(address_id,total_prices,function(json){
    		console.log(json)
        if(json.code===0){
					$(".tip-main").html(json.message);
		      $("#rng").css({"display":"block"});
					setTimeout(function () {
        		location.href="order.html";
					},2000);
        }else if(json.code===2002){
					$(".tip-main").html(json.message+'<p>3s后带小主去热门商品</p>')
		      $("#rng").css({"display":"block"});
					setTimeout(function () {
						location.href='hotgoods.html'
					},2000);
				}


    	})
    }
})
function serializeForm(oForm) {
  //得到所有的元素
  var elems = oForm.elements;
  console.log(elems)
  var arr = {};
  for (var i = 0; i < elems.length; i++) {
    //当前遍历的小元素
    var e = elems[i];
    //分类讨论
    switch(e.type) {
      //如果控件的类型是按钮，那么没有任何返回值
      case 'button':
      case 'submit':
      case 'reset':
        break;
      //如果是文本框，得到value
      case 'text':
      case 'password':
      case 'textarea':
        arr[e.name] = e.value;
        break;
      //如果是单选或复选
      case 'radio':
      case 'checkbox':
        if (e.checked) {
          arr[e.name] = e.value;
        }
        break;
      case "select-one":
        var options = e.querySelectorAll('option');
        for (var j = 0; j < options.length; j++) {
          if (options[j].selected) {
            arr[e.name] = options[j].value;
          }
        }
        break;
    }
  }
  return arr;
}
