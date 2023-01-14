require('../css/orderdetails.less');
require('jquery');

//获取下单信息
function getOrder() {
	$.ajax({
		type:'GET',
		url:'http://localhost:8080/api/order.json',
		success:function(data) {
			createOrder(data);
		}
	})
}
getOrder();


//渲染数据
function createOrder(data) {
	//随机匹配用户，因为没有后端
	var rand = Math.floor(Math.random() * 4);
	var datal = data.datalist;
	// console.log(datal);
	// console.log(rand);

	if(rand >=0 && rand <= 4) {
	    //顶部地址信息
		$('.name_tel mark').html(datal[rand].adderss.name);
		$('.name_tel em').html(datal[rand].adderss.mobile);
		$('.header-info info address').html(datal[rand].adderss.orderAdderss);

		//中间商品信息
		$('.content h2').html(datal[rand].spect)
		$('.content .show-img').html(`<img src="${datal[rand].imgurl}">`);
		$('.content .info .money').html(datal[rand].price);
		$('.content .info .number').html(datal[rand].number);

		//底部信息
		$('.footer p em').html(datal[rand].amount);
	}
}


//点击事件
function bindEvent() {
	$('.footer .submit').click(function() {
		alert('提交成功');
		window.open('http://localhost:8080/html/index.html');
	})
}
bindEvent();