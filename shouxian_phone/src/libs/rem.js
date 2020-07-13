const baseSize = 32
// 设置 rem 函数
function setRem() {


    let htmlWidth = document.documentElement.clientWidth / 375;

    //设置根元素字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(htmlWidth, 2)) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}
