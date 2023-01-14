//导出,依赖模块
define(['myLib'],function(myLib) {
	console.log(myLib.a)
	function add(a,b) {
		return a + b;
	}
	return {
		add:add
	}
})

