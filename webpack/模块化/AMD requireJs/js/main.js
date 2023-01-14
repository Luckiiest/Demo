//导入文件
require.config({
	baseUrl: './js/tool', //基础路径
	paths:{
		'jquery': 'jquery',
	    'math': 'math',
	}
})

//加载模块
require(['jquery','math'],function($,math){
	console.log($());
	console.log(math.add(1,2));
})