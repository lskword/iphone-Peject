/**
 * Created by lx on 2017/10/14.
 */
// console.log(localStorage.toatPrices);
$(".payconent:last")[0].innerText=localStorage.toatlPrices+'.00元';
$(".payconent:eq(1)")[0].innerText=localStorage.username;
$(".divuser").html(localStorage.username);
