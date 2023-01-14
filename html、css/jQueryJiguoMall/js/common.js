// 插件封装 可维护 复用 交互性
// 参数：规定当前插件的作用，效果
(function($) {
    $.fn.extend({
        // 点击返回顶部插件
        "backBtn": function(options) {
            var obj = {
                isBack: true, // 可选属性，是否返回顶部
                scrollTop: 0, // 可选属性，默认为0，滚动条多少时出现
                position: 'left', // 可选属性，控制当前按钮再内容区域的位置
                width: 1000, // 可选属性，内容区域的宽度
                offset: 0, // 可选属性，距离内容区域的距离
                speed: 800, // 可选属性，滚动速度
                ifShow: false, // 默认是否显示
                bottom: 100, // 距离底部的距离
            } // 默认值，如果用户不传，就按照默认值属性来走
            var ops = $.extend(obj, options); // 对象合并，第二个往第一个合并，如果相同的属性，替换
            var $win = $(window), // window 
                $dom = $(this); // this
            var opr = {
                // 获取想要的值
                // 设置想要的值
                // 实现想要的功能

                // 获取按钮距离文档左右的距离
                getLeft: function() {
                    var l; // 按钮距离文档的距离
                    var winWidth = $win.width(); // 当前窗口的宽度
                    var domWidth = $dom.outerWidth(); //获取到当前元素的宽度
                    if (ops.position == 'left') {
                        l = (winWidth - ops.width) / 2 - ops.offset;
                    } else if (ops.position == 'right') {
                        // l = 空白区域 + 内容区域 + ops.offset
                        l = ((winWidth - ops.width) / 2) + ops.width + ops.offset;
                    }
                    return l;
                },
                // 获取按钮距离顶部的距离
                getTop: function() {
                    var t; // 距离页面顶部的距离
                    var winHigh = $win.height(); // 当前窗口的高度 
                    var domHigh = $dom.outerHeight(); // 当前元素的高度
                    t = winHigh - domHigh - ops.bottom;
                    return t;
                },
                // 设置按钮距离文档上下左右的距离
                setPosition: function() {
                    var L = this.getLeft(); // 距离文档左右的距离
                    var T = this.getTop(); // 距离页面底部的距离
                    $dom.css({
                        left: L + 'px',
                        top: T + 'px'
                    })
                },
                // 初始化
                init: function() {
                    this.setPosition();
                    // 判断scrollTop大于？时出现
                    $win.scroll(function() {
                        if ($win.scrollTop() > ops.scrollTop) {
                            $dom.show();
                        } else {
                            $dom.hide();
                        }
                    })
                    // 随着页面大小改变按钮
                    $win.resize(function() {
                        opr.setPosition();
                    })
                    // 点击事件
                    if (ops.isBack) {
                        $dom.on('click', function() {
                            $('body,html').animate({
                                scrollTop: 0
                            }, ops.speed)
                        })
                    }
                    // 时候显示按钮
                    if (ops.isShow) {
                        $dom.show();
                    } else {
                        $dom.hide();
                    }
                }
            }
            opr.init();
            return $dom;
        }
    })
}(jQuery));


$(function() {

    // 轮播图
    $('.next').on('click', next)
    // 点击前一张按钮时
    $('.prev').on('click', prev)

    var timer = null, // 计时器
        flag = true,
        oUl = $('.hot ul'),
        oSlideBox = $('.slide-box');

    function prev() {
        if (!oUl.is(':animated')) {
            // 先将原本是最后一个的li放到首位
            oUl.find('li').last().prependTo(oUl);
            // 将放到首位的li藏出去，
            // 利用动画的方式移动进来
            oUl.css('left', '-1002px').animate({
                left: 0
            }, 800);
            auto();
        }
    }

    function next() {
        // 判断当前的这个li是否在执行动画
        // oUl.is(':animated');
        // 如果不在执行动画
        if (!oUl.is(':animated')) {
            // console.log('aa');
            // 每点击一次，让ul向左侧移动1002px
            oUl.animate({
                left: "-1002px"
            }, 800, function() {
                // 将移走的第一个li放入到ul的后面
                oUl.find('li').eq(0).appendTo(oUl)
                // 再将原本已经移动的ul还原，因为需要显示第一个li
                oUl.css('left', '0px');
            })
            auto();
        }
    }

    function auto() {
        clearTimeout(timer)
        timer = setTimeout(function() {
            next();
        }, 3000)
    }


    oSlideBox.on('mouseover', function() {
        clearTimeout(timer);
    })
    oSlideBox.on('mouseout', function() {
        auto();
    })

    // ajax 请求渲染数据
    // 请求次数
    var indexNum = 0;
    $('.conMore').on('click', function() {
        var self = $(this);
        self.html('正在加载中...').removeClass('cl').addClass('loading');
        $.ajax({
            type: 'post',
            url: 'localhost/me/major/Code/Web/project/jQueryJiguoMall/json/json.js',
            dataType: 'json',
            success: function(data) {
                var dataList = data[indexNum];
                var param = '';
                for (var i = 0; i < dataList.length; i++) {
                    // dataList[i].img; //图片地址
                    // dataList[i].text; //文字
                    // dataList[i].price; //价钱
                    param += `<li>
                                    <img src="${dataList[i].img}" alt="">
                                    <div class="info">
                                        <p class="name">${dataList[i].text}</p>
                                        <div class="fix">
                                            <span class="left price">${dataList[i].price}</span>
                                            <p class="right">
                                                <span class="zan">3</span>
                                                <span class="reply">3</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>`
                }
                self.parent().prev().append(param);
                indexNum++;
                self.html('点击加载更多').removeClass('loading').addClass('cl');
                if (indexNum >= data.length) {
                    self.parent().html("<span class='no-more'>没有更多啦！</span>");
                }
            }
        })
    })

    // // 返回顶部按钮
    // $(window).scroll(function() {
    //     // 当滚动距离大于100时
    //     if ($(window).scrollTop() > 100) {
    //         $('#back-top').show();
    //     } else {
    //         $('#back-top').hide();
    //     }
    // })
    // // 当点击返回顶部按钮时，返回当前的最顶端
    // $('#back-top').on('click', function() {
    //     $('html,body').animate({
    //         scrollTop: 0
    //     }, 800)
    // })


    $('#back-top').backBtn({
        isBack: true, // 可选属性，是否返回顶部
        scrollTop: 0, // 可选属性，默认为0，滚动条多少时出现
        position: 'left', // 可选属性，控制当前按钮再内容区域的位置
        width: 1000, // 可选属性，内容区域的宽度
        offset: 0, // 可选属性，距离内容区域的距离
        speed: 800, // 可选属性，滚动速度
        ifShow: false, // 默认是否显示
        bottom: 100, // 距离底部的距离
    });


})