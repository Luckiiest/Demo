require('../css/index.less');
require('jquery');


//热替换
function moduleHot() {
	if(module.hot) {
		//是否开启热更新
		module.hot.accept();//接受热更新
	}
}
moduleHot();


//获取商品列表
function getGoodsList() {
	$.ajax({
		type: 'GET',
		url:'http://localhost:8080/api/goodsList.json',
		success: function(data) {
			// console.log(data);
			createlist(data);
		}
	})
}
getGoodsList();

//渲染数据函数
function createlist(data) {
	var str = "";
	data.list.forEach(function(ele,index) {
		str += `<a href="http://localhost:8080/html/goodsInfo.html?id=${ele.id}">
					<div class="goods_item">
		                <img src="${ele.imgurl[0]}" alt="">
		                <p class="item_name">
		                    ${ele.name}
		                </p>
		                <p class="item_price">
		                    ${ele.spectList[0].price}
		                </p>
		            </div>
	            </a>`
	})
	$('.tab_content').html(str);
}

