if(localStorage.token){
	$(".header-img p").html(localStorage.username);
	$(".footer li a").eq(0).html(localStorage.username);
	$(".footer li a").eq(1).html("退出");
	$("#order").on("click",function(){
		location.href="order.html"
	})
	$("#cart").on("click",function(){
		location.href="cart.html"
	})
	$("#set").on("click",function(){
		location.href="#";
	})
	$("#search").on("click",function(){
		location.href="hotgoods.html"
	})
}else{
	$("#order").on("click",function(){
		location.href="login.html"
	})
	$("#cart").on("click",function(){
		location.href="login.html"
	})
	$(".header-img img").on("click",function(){
		location.href="login.html"
	})
	$("#set").on("click",function(){
		location.href="login.html"
	})
	$("#search").on("click",function(){
		location.href="login.html"
	})
}
$(".footer li a").eq(1).on("click",function(){
  localStorage.clear();
  $(".header-img p").html("");
	$(".footer li a").eq(0).html("");
	$(".footer li a").eq(1).html("");
})
