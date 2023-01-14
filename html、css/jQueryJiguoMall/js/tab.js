$(function() {
    // tab选项卡 点击指令li时，让对应的div显示

    // $('.tabNav li').on('click', function() {
    //     $('.tabNav li.active').removeClass('active');
    //     $(this).addClass('active')

    //     var index = $(this).index(); // 获取当前li的索引值
    //     $('.tabBox .show').removeClass('show');
    //     $('.tabBox .box').eq(index).addClass('show');
    // })

    //  选项卡的导航容器，类名必须为tabNav
    //  选项卡的显示内容的div，必须为Box
    $.fn.extend({
        "tab": function(ops) {
            var obj = {
                    evenType: 'click', // 点击类型
                    liCurClass: 'active', // 选中导航的class名称
                    divCurClass: 'show' // 点击改变内容的class
                }
            var opt = $.extend(obj, ops)
            if($(".tabNav li").length!=$(".tabBox .box").length) throw ""
            $('.tabNav li').on(opt.evenType, function() {
            	$(this).addClass(opt.liCurClass).siblings().removeClass(opt.liCurClass);
                var index = $(this).index(); // 获取当前li的索引值
                $('.tabBox .box').eq(index).addClass(opt.divCurClass).siblings().removeClass(opt.divCurClass);
            })
        }
    })
    $('.main').tab()
})