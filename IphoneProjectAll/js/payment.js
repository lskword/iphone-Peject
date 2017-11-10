/**
 * Created by lx on 2017/10/14.
 */
// console.log(localStorage.toatPrices);
$(".payconent:last")[0].innerText=localStorage.toatlPrices+'.00元';
$(".payconent:eq(1)")[0].innerText=localStorage.username;
console.log($(".payconent:eq(0)")[0]);
$(".payconent:eq(0)")[0].innerText=localStorage.shopname;
$(".divuser").html(localStorage.username);
