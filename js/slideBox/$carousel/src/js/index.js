var nowIndex = 0,
    w = $('.wrapper').width(), // li宽度
    len = $('.item').length, // li的个数
    slider_timer = undefined,
    flag = true;

function init() {
    bindEvent();
    slider_auto();
}

// 绑定点击事件
function bindEvent() {
    $('.prevBtn').add($('.nextBtn')).add($('.order .item')).on('click',function() {
        if($(this).attr('class') == 'prevBtn') {
            move('left');
        } else if ($(this).attr('class') == 'nextBtn') {
            move('right');
        } else {   
            var value = $(this).index();
            move(value);
        }
        orderIndex(nowIndex);
    })
    $('.wrapper')
        .mousemove(function() {
            $('.btn').css({display:'block'});
            clearTimeout(slider_timer);
        })
        .mouseout(function() {
            $('.btn').css({display:'none'});
            clearTimeout(slider_timer);
            slider_auto();
        })
}

// 轮播方向
function move(direction){
    if(flag) {
        flag = false;
        var a = 1;
        if(direction == 'left' || direction == 'right') {
            if(direction == 'left') {
                if(nowIndex == 0) {
                    $('.img-box').css({left:-(w * len)});
                    nowIndex = len - 1;
                } else {
                    nowIndex = nowIndex - 1;
                }
            } else {
                if(nowIndex == len - 1) {
                    a = 0;
                    $('.img-box').animate({left: -(w * len)},function() {
                        $(this).css({left:0});
                        clearTimeout(slider_timer);
                        slider_auto();
                        flag = true;
                    });
                    nowIndex = 0;
                } else {
                    nowIndex = nowIndex + 1;
                }
            }
        } else {
            nowIndex = direction;
        } 
        if() {
            $('.img-box').animate({left: -(w * nowIndex)},function() {
                clearTimeout(slider_timer);
                slider_auto();
                flag = true;
            });
        }
    }
}

// 小圆点变换颜色
function orderIndex(index) {
    $('.active').removeClass('active');
    $('.item').eq(index).addClass('active');
}

// 自动轮播
function slider_auto() {
    slider_timer = setTimeout(function() {
        move('right');
        orderIndex(nowIndex);
    },3000)
}

init();