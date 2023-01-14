require('../css/goodsInfo.less');
require('./goodsCover.js');

//获取页面id值
function getId() {
	var optionList = window.location.search.slice(1).split('&'),
	    idNum = null;
	//['page=3','id=2']
	optionList.forEach(function(ele,index) {
		if(ele.indexOf('id=') !== -1){
			//如果数组中有id=，则截取第三位
			idNum = ele.slice(3);
		}
	})
	return idNum;
}

//获取数据
function getGoodsList() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/api/goodsList.json',
		success: function(data) {
            createGoodsInfo(data)
		}
	})
}
getGoodsList();

//渲染数据
function createGoodsInfo(data) {
	var str = "";
	//获取id
	var idNum = getId(),
	    dataList = data.list,
	    len = dataList.length,
	    liStr = '';
	for(var i = 0;i < len; i++) {
		if(dataList[i].id == idNum){
			//图片
			$(".infor_one_img").html(`<img src=${dataList[i].imgurl[0]}>`);

			//名称
			$('.one_name').html(dataList[i].name);

			//价格
			//进行排序
			dataList[i].spectList.sort(findPrice('price'));
			$('.one_price').html('￥' + dataList[i].spectList[0].price + '~' + dataList[i].spectList[dataList[i].spectList.length - 1].price);

			//添加详情图片
			dataList[i].imgurl.forEach(function (ele, index) {
                str += '<img src="'+ ele +'"/>';
            });
            $('.infor_th').append($(str));

            //商品规格
            dataList[i].spectList.forEach(function (ele, index) {
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>';
            });
            $('.buy_spect_wrap ul').html(liStr);
		}
	}
}

//价格排序
function findPrice(price){
	return function(a,b) {
		return a[price] - b[price];
	}
}


//选择商品规格，绑定点击事件
function bindEvent() {
	$('.infor_two').on('click',function() {
		$(".buy_wrap").css('display','block');
		$('html').css({height:'100%',overflow:'hidden'})
	})
	$('.buy_gray').on('click',function() {
		$('.buy_wrap').css('display','none');
		$('html').css({height:'100%',overflow:'visivle'})
	})
}
bindEvent();
