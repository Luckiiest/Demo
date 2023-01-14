//悬浮栏
var nav = document.getElementById('seckillNav');
window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop;
    if(scrollTop <= 333) {
        seckillNav.className = 'xf qx';
    }else {
        seckillNav.className = 'xf cx';
    }
}
//轮播特效区域
//封装函数
function byId(id) {
    return typeof(id) === 'string'?document.getElementById(id):id;
}
//全局变量
var index = 0, //索引
    timer = null,
    pics = byId('banner').getElementsByTagName('div'),
    len = pics.length;
//定义函数
function slideImg() {
    var banner = byId('banner');
    //当鼠标停留在区域内，清除定时器
    banner.onmouseover = function() {
        clearInterval(timer);
    }
    //鼠标移开区域内，定时切换图片
    banner.onmouseout = function() {
        timer = setInterval(function() {
            index++;
            if(index >= len) {
                index = 0;
            }
            changeImg();
        },3000);
    }
    banner.onmouseout();
}
//切换图片
function changeImg() {
    for(var i = 0; i < len; i++) {
        pics[i].style.display = 'none';
    }
    pics[index].style.display = 'block';
}
slideImg();
