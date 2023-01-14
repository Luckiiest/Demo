require('../css/index.less');
require('zepto-webpack'); //z代表zepto
//渲染信息模块
require('./render.js');
//点击事件索引模块
require('./controlManager.js');
//音乐控制模块
require('./audioControl.js');
//获取root
const root = window.player;
//获取body
$scope = z(document.body);


//点击事件函数
var index = 0;
var songList; //全局变量，取data值
var audio = new root.audioControl();


function bindEvent() {
	$scope.on('playChange',function(event,index) {
		// console.log(songList[index].audio);
		audio.getAudio(songList[index].audio)
		if(audio.status == "play") {
			audio.play();
		}
	})

	//上一首
	$scope.on('click','.prev-btn',function() {
		// if(index == 0) {
		// 	index == songList.length - 1;
		// } else {
		//     index --;
		// }
		var index = controlManager.prev();
		// console.log(index);
		root.render(songList[index]);
		$scope.trigger('playChange',index);
	})
	//下一首
	$scope.on('click','.next-btn',function() {
		// if(index == songList.length - 1) {
		// 	index == 0;
		// } else {
		// 	index ++;
		// }
		var index = controlManager.next();
		// console.log(index);
		root.render(songList[index]);
		$scope.trigger('playChange',index);
	})

	//播放&暂停
	$scope.on('click','.play-btn',function(){
		if(audio.status == 'play') {
			audio.pause();
		} else {
			audio.play();
		}
		z(this).toggleClass('pause');
	})
}


//请求数据
function getData(url) {
	z.ajax({
		type: 'GET',
		url:url,
		success: function(data){
			root.render(data[0]);
			songList = data;
			bindEvent();
			controlManager = new root.controlManager(data.length);
			console.log(data);
			$scope.trigger('playChange',0);
		},
		error: function(){
			console.log('error');
		}
	})
}

getData('../mock/data.json');
