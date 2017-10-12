var oLis = document.querySelectorAll('header ul li');
var oDl = document.querySelector('#carousel dl');
var oDd = document.querySelectorAll('#carousel dl dd');
var index = 0;
var idx = 1;
oLis.forEach(function(item) {
  (function(idx) {
    item.onclick = function() {
      for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = '';
      }
      this.className = 'xuanzhong';
      oDl.style.left = ((-idx + 1) * 100) + '%';
    };
  }(idx));
  idx++;
});
