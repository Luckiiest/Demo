var total = 15, // 图片的数量有多少，li就生成多少个
	// li的宽度，作用于li的高度。 用ul的宽度减去4个li的左右padding，总共24px，然后再除以4个li
	liWidth = ($('ul').width() - 24) / 4,
	activeIndex,
	ratio = $(window).height() / $(window).width();

// 创建DOM，li由js生成
function render() {
	var str = '';
	for(var i = 0; i < total; i++) {
		str += `<li style="height:${liWidth}px"><img src="./src/img/${i}.png" alt=""></li>`;
	}

	$(str).appendTo($('.wrapper')).animate({opacity:1},500);
}

render();

// 点击ul中li源对象
$('ul').on(('tap'),'li',function() {
	activeIndex = $(this).index();
	show(activeIndex);
})

// 当点击到那个图片的时候，就显示那个图片
function show(i) {
	$('.show').html("").show();
	var oImg = new Image();
	oImg.src = `./src/img/${i}.png`;
	oImg.onload = function() {
		var h = this.height,
			w = this.width;
		// 如果是竖图
		if(h / w > ratio) {
			$(this).appendTo($('.show')).css("height","100%").animate({opacity:1},500);
		// 如果是横图
		} else {
			$(this).appendTo($('.show')).css('width','100%').animate({opacity:1},500);
		}
	} 
}

// 事件效果
$('.show')
	// 点击展示图片消失
	.on('tap',function() {
		$(this).hide();
	})
	// 向左滑动
	.on("swipeLeft",function() {
		if(activeIndex < total - 1) {
			activeIndex++;
			show(activeIndex);
		}
	})
	// 向右滑动
	.on('swipeRight',function() {
		if(activeIndex > 0) {
			activeIndex--;
			show(activeIndex);
		}
	})

