/*----------自适应屏幕改变html的font-size-----------*/
window.onresize = set;
set();
function set() {
    //设计师的实际图320宽，320状态下font-size我们设置的是64px;
    /*
     600 / 30 = windowWidth / x
     x = windowWidth / (600 / 30)
     */
    var windowWidth = document.documentElement.clientWidth;
    var fontsize = windowWidth / (20 / 1);
    document.documentElement.style.fontSize = fontsize + 'px';
}
