/*轮播*/


var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,//可选选项，自动滑动
    pagination: '.swiper-pagination',
    paginationClickable: true
});
(function() {
  window.onload=function(){
  window.onresize=function(){
    location.href=location.href;
  }
}
})();

    // location.href=location.href;
/*分类部分AJAX请求*/
$.ajax({
    url:'http://h6.duchengjiu.top/shop/api_cat.php',
    type:"get",
    dataType:'json',
    success:function(json){

        var data = json.data;
        for(var i = 0; i < data.length;i++){                            //第一次ajax请求类别建立
            var obj = data[i];
            var oCat = document.querySelector("#cat");
            oCat.innerHTML +=
                `<div class="catbox">
                        <div class="catname">
                            <i></i>
                            <span>${obj.cat_name}</span>
                        </div>
                        <div class="catlist">
                        </div>
                    </div>`
        }
        var oCatList = document.querySelectorAll(".catlist");
        for(var j=0;j<oCatList.length;j++){
            (function (i) {
                var objx = data[j];
                var oCatListNow = oCatList[i];
                $.ajax({
                    url:'http://h6.duchengjiu.top/shop/api_goods.php?${obj.cat_id}',
                    type:"get",
                    data:{cat_id:objx.cat_id,pagesize:8},
                    dataType:'json',
                    success:function(innerjson){
                        var datalist = innerjson.data;
                        for(var k=0;k<datalist.length;k++) {
                            var datainner = datalist[k];
                            console.log();
                            oCatListNow.innerHTML +=`<a href="iphone-goods.html?goods_id=${datainner.goods_id}">
                                                        <div>
                                                            <img src="${datainner.goods_thumb}">
                                                            <nobr>${datainner.goods_name}</nobr>
                                                            <b>${datainner.price}</b>
                                                        </div>
                                                      </a>`
                        }
//                             oCatListNow.innerHTML += `
//                                <div class="leftcat"></div>
//                                <div class="rightcat"></div>
//                                <div class="rightcat"></div>
//                                <div class="rightcat"></div>
//                                <div class="leftcat"></div>
//                                <div class="rightcat"></div>
//                                <div class="rightcat"></div>
//                                <div class="rightcat"></div>`
                    }
                })
            })(j)
        }

    }
});

/*buying部分ajax请求*/
$.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_goods.php',
    type: "get",
    dataType: 'json',
    data: {pagesize: 4},
    success: function (json) {
        var data = json.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var oBuying = document.querySelector(".hotgoods");
            oBuying.innerHTML +=
                `<div>
                     <a href="iphone-goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}"></a>
                 </div>`
        }
    }
});

/*倒计时*/
function countDown(endTime, startTime = new Date()) {//为了满足一些特殊情况这里给一个开始时间的参数并附上默认值，一般情况只需要传入结束时间即可
     date = endTime - startTime; //时间差
     mmsec = date % 1000 //所余毫秒数
     seconds = Math.floor(date / 1000 % 60); //所余秒数
     minutes = Math.floor(date / 1000 / 60 % 60); //所余分钟数
     hour = Math.floor(date / 1000 / 60 / 60 % 24); //所余时钟数
     day = Math.floor(date / 1000 / 60 / 60 / 24); //天数
    return {
        day: day
        , hour: hour
        , minutes: minutes
        , seconds: seconds
        , mmsec: mmsec
    }
}
const timeB = document.querySelector('#timegood');
//开启定时器
setInterval(() => {
     time = countDown(new Date(2017, 11, 11));//只需要传入结束时间
timeB.innerHTML =  `<span>${time.day}</span>:<span>${time.hour}</span>:<span>${time.minutes}</span>:<span>${time.seconds}</span>` //距离2016年9月1号00点
}, 50);
