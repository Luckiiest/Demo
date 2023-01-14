
// 把li变成类数组
var oLi = Array.prototype.slice.call(document.getElementsByTagName('li'));


// 循环li，添加类名
oLi.forEach(function(ele,index) {

	ele.spec = getSpec(ele);

	ele.addEventListener('mouseenter',function(e) {
		addClass(this,e,'in');
	})
	ele.addEventListener('mouseleave',function(e) {
		addClass(this,e,'out');
	})
})

function getSpec(ele) {
	return {
		x : ele.offsetWidth,
		y : ele.offsetHeight
	}
}

function addClass(ele,e,state) {
	// 判断鼠标从哪个方向进入的
	// 公式：
	// (Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) % 4
	
	// 判断x、y轴的圆心坐标（用offsetX减去元素的宽高除2）
	// 判断x轴的圆心坐标
	var x = e.offsetX - ele.spec.x / 2;
	// 判断y轴的圆心坐标
	var y = e.offsetY - ele.spec.y / 2;

	// Math.atan2(y,x)  x、y轴的坐标
	// 180 / Math.PI  弧度转换为角度
	// + 180  每个角度+180度变为正数
	// / 90 除90度变成1——4的几个数字，通过取整表示某个数字是某个方向
	// + 3 % 4  通过+3再%4就会让每个方向的数字只有一个，0 1 2 3代表四个方向
	// 例如：Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) % 4
	
	var d = (Math.round((Math.atan2(y,x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
	var direction;

	switch(d) {
		case 0:
			direction = 'top';
			break;
		case 1:
			direction = 'right';
			break;
		case 2:
			direction = 'bottom';
			break;
		case 3:
			direction = 'left';
			break;
	}
	ele.className = state + "-" + direction;
}

