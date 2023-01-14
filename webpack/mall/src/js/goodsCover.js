require('jquery');
require('../css/goodsCover.less');
var state = {
    num: 1,
    choice: false
}
function init() {
    bindEventSpect();
}
init();

function bindEventSpect() {
	//添加事件源对象
    $('.buy_spect_wrap ul').on('click', '.buy_spect_li',function () {
        state.choice = true;
        //将之前li的样式全部清除
        $('.buy_spect_li').removeClass('active')
        //给点击的li添加样式
        $(this).addClass('active');
        //价格改变
        $('.price_value').html($(this).attr('data-price'));
        //商品数量
        state.num = 1;
        $('.buy_number_value').html(state.num);
    })
    //商品数量--
    $('.buy_number_decrease').click(function () {
        if(state.num > 1) {
            $('.buy_number_value').html(--state.num);
        }    
    })
    //商品数量++
    $('.buy_number_add').click(function () {
        $('.buy_number_value').html(++state.num);
    })
    //确认
    $('.buy_ok').click(function () {
        if(state.choice == true) {
            window.open('http://localhost:8080/html/orderdetails.html');
        }else {
            alert('请选择规则');
        }
    })
}
